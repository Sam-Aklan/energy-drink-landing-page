import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import {ScrollTrigger,} from 'gsap/ScrollTrigger'
import {SplitText} from 'gsap/SplitText'
import LightBolt from '../LightBolt'
import { Canvas } from '@react-three/fiber';
import Scene from '../Model/Scene';
import { useEffect, useState, type RefObject } from 'react';

gsap.registerPlugin(useGSAP,ScrollTrigger,SplitText);

const Intro = ({audioRef,hasPlayedOnce}:{audioRef: RefObject<HTMLAudioElement | null>, hasPlayedOnce:boolean}) => {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [previousProgress, setPreviousProgress] = useState(0)
 
  
  const options = {duration:1,ease:'power3.out',stagger:.025};

  const tooltipsSelectors = [
    {
      trigger:.65,
      elements: [
        ".tooltip:nth-child(1) .icon ion-icon",
        ".tooltip:nth-child(1) .title .line > span",
        ".tooltip:nth-child(1) .description .line > span",
      ]
    },
    {
      trigger:.85,
      elements:[
        ".tooltip:nth-child(2) .icon ion-icon",
        ".tooltip:nth-child(2) .title .line > span",
        ".tooltip:nth-child(2) .description .line > span",
      ]
    }
  ]

  useGSAP(()=>{
    const header1Split = new SplitText('.header-1 h1',{
      type:"chars",
      charsClass:"char"
    });

    const titleSplit = new SplitText(".tooltip .title h2",{
      type:"lines",
      linesClass:"line"
    })

    const descriptionSplit = new SplitText(".tooltip .description p",{
      type:"lines",
      linesClass :"line"
    })

    header1Split.chars.forEach(char=>(char.innerHTML = `<span>${char.innerHTML}</span>`));

    [...titleSplit.lines, ...descriptionSplit.lines].forEach(line=>(
      line.innerHTML = `<span>${line.innerHTML}</span>`
    ))

    ScrollTrigger.create({
      trigger:".product-overview",
      start:"75% bottom",
      onEnter:()=> gsap.to(".header-1 h1 .char > span",{
        y:'0%',
        duration:1,
        ease:"power3.out",
        stagger:.025
      }),
      onLeaveBack: ()=> gsap.to(".header-1 h1 .char > span",{
        y:"100%",
        duration:1,
        ease:"power3.out",
        stagger:.025
      })
    })

    ScrollTrigger.create({
      trigger: ".product-overview",
      start:"top top",
      end:`+=${window.innerHeight * 8}px`,
      pin:true,
      pinSpacing:true,
      scrub:1,
      onUpdate:({progress})=>{
       
        const headerProgress = Math.max(0,Math.min(1,(progress - .05)/.3))
        
        gsap.to(".header-1",{
          xPercent:progress<.05?0: progress >.35 ? -100 : -100 * headerProgress
        })

        const maskSize = progress < .2?0: progress >.3 ?100: 100 * ((progress -.2) /.1)

        gsap.to(".circular-mask",{
          clipPath: `circle(${maskSize}% at 50% 50%)`,
        })

        const header2Progress = (progress - .15) / .35
        const header2xPercent = progress < .15 ?100 : progress > .5? -250 : 100 - 300 * header2Progress

        gsap.to('.header-2',{xPercent: header2xPercent})

        const scaleX = progress < .45? 0 : progress > .65 ? 100: 100 * ((progress -.45) / .2);

        gsap.to('.tooltip .divider',{scaleX: `${scaleX}%`,...options})

        tooltipsSelectors.forEach(({trigger, elements})=>{
          gsap.to(elements,{
            y: progress > trigger?"0%":"125%",
            ...options
          })
        })
        // sound animation
        // console.log("current progress",progress)
        setCurrentProgress(progress)
        setTimeout(()=> setPreviousProgress(progress),800)
        if (audioRef.current && progress > 0 && currentProgress === previousProgress) {
          if(!audioRef.current.played.length || audioRef.current.ended)audioRef.current.play();
        
        }
      }
    })
  })

  
  return (
    <div className=''>
  <section className="intro">
    <h1>VOLT doesn't buzz. It ignites.</h1>  
  </section>
  
  <section className="product-overview">
    <div className="header-1">
      <h1>Every Champion Starts With</h1>
    </div>
    <div className="header-2">
      <h1>VOLT Energy</h1>
    </div>
    <div className="circular-mask"></div>

    <div className="tooltips">
      <div className="tooltip">
        <div className="icon">
            <LightBolt className="ion-icon" fill='#000'/>
        </div>
        <div className="divider"></div>
        <div className="title">
          <h2>Sustained Power</h2>
        </div>
        <div className="description">
          <p>Engineered for endurance. VOLT delivers 8 hours of focused energy without the crash. Peak performance when you need it most.</p>
        </div>
      </div>
      <div className="tooltip">
        <div className="icon">
        <LightBolt className="ion-icon" fill='#000'/>
        </div>
        <div className="divider"></div>
        <div className="title">
          <h2>Smart Energy</h2>
        </div>
        <div className="description">
          <p>With our performance tracker, optimize your energy intake. Monitor consumption, sync with workouts, and maximize every drop.</p>
        </div>
      </div>
    </div>
    <div className="model-container1">
    <div className='absolute top-0 left-0 h-screen w-full z-10'>
    <Canvas>
       <Scene/>
    </Canvas>
    
  </div>
    </div>
  </section>
  
  <section className="outro">
    <h1>Don't Just Wake Up — VOLT Up</h1>
  </section>
</div>
  )
}

export default Intro