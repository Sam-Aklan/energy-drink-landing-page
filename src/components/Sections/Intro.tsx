import React from 'react'
import LightBolt from '../LightBolt'

const Intro = () => {
  return (
    <div className='bg-blue-300'>
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
            <LightBolt fill='#ffffff'/>
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
        <LightBolt fill='#ffffff'/>
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
    <div className="model-container"></div>
  </section>
  
  <section className="outro">
    <h1>Don't Just Wake Up — VOLT Up</h1>
  </section>
</div>
  )
}

export default Intro