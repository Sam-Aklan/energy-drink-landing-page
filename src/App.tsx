
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef, useState } from 'react'
import './App.css'

import Intro from './components/Sections/Intro';
function App() {
  const lenisRef = useRef<LenisRef>(null)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown");
  const audioRef = useRef<HTMLAudioElement|null>(null)
  
  useEffect(() => {
    function update(time:number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)

    const checkPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: "microphone" as PermissionName });
        setPermissionStatus(permission.state as any);

        permission.onchange = () => {
          setPermissionStatus(permission.state as any);
        };

        // If permission is "prompt", try to request access
        if (permission.state === "prompt") {
          await requestMicrophoneAccess();
        }
      } catch (error) {
        alert("grant access to microphone")
        console.warn("Permissions API not supported or failed:", error);
        setPermissionStatus("unknown");
        await requestMicrophoneAccess(); // fallback
      }
    };

    const requestMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop immediately
        setPermissionStatus("granted");
      } catch (err) {
        setPermissionStatus("denied");
        console.error("Microphone access denied:", err);
      }
    };

    checkPermission();
  
    return () => gsap.ticker.remove(update)
  }, [])
 return (
  <>
  <ReactLenis root options={{autoRaf:false,lerp:0.5}} ref={lenisRef}>
  <Intro audioRef={audioRef} hasPlayedOnce/>
  <audio src='/model/electricity-glitch.mp3' ref={audioRef}/>
  </ReactLenis>
  </>
  
 )
}

export default App
