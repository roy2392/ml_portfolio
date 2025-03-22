import React, { useEffect, useRef, useState } from "react";
import "../styles/Robot.css";

const Robot = () => {
  const robotRef = useRef(null);
  const arcReactorRef = useRef(null);
  const arcReactorInnerRef = useRef(null);
  const arcReactorCenterRef = useRef(null);
  const eyeDisplayLeftRef = useRef(null);
  const eyeDisplayRightRef = useRef(null);
  const headRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const handLeftRef = useRef(null);
  const handRightRef = useRef(null);
  const bodyRef = useRef(null);
  const [handsActive, setHandsActive] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0.8);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!robotRef.current) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const robotRect = robotRef.current.getBoundingClientRect();
      const robotCenterX = robotRect.left + robotRect.width / 2;
      const robotCenterY = robotRect.top + robotRect.height / 2;
      
      const deltaX = (mouseX - robotCenterX) / (window.innerWidth / 3);
      const deltaY = (mouseY - robotCenterY) / (window.innerHeight / 3);
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const powerBoost = 1 - Math.min(distance, 1);
      
      setPowerLevel(0.8 + powerBoost * 0.2);
      
      if (bodyRef.current) {
        bodyRef.current.style.transform = `rotateY(${deltaX * 10}deg) rotateX(${-deltaY * 5}deg)`;
      }
      
      if (headRef.current) {
        headRef.current.style.transform = `rotateY(${deltaX * 15}deg) rotateX(${-deltaY * 8}deg)`;
      }
      
      if (armLeftRef.current) {
        armLeftRef.current.style.transform = `rotate(${5 + deltaX * 12}deg) rotateX(${-deltaY * 5}deg)`;
      }
      
      if (armRightRef.current) {
        armRightRef.current.style.transform = `rotate(${-5 - deltaX * 12}deg) rotateX(${-deltaY * 5}deg)`;
      }
      
      if (handLeftRef.current) {
        handLeftRef.current.style.transform = `rotateX(${deltaY * 20}deg) rotateY(${deltaX * 5}deg)`;
      }
      
      if (handRightRef.current) {
        handRightRef.current.style.transform = `rotateX(${deltaY * 20}deg) rotateY(${deltaX * 5}deg)`;
      }
      
      if (eyeDisplayLeftRef.current && eyeDisplayRightRef.current) {
        const eyeDeltaX = Math.min(Math.max(deltaX * 1.5, -1), 1) * 6;
        const eyeDeltaY = Math.min(Math.max(deltaY * 1.5, -1), 1) * 4;
        
        eyeDisplayLeftRef.current.style.transform = `translateX(${eyeDeltaX}px) translateY(${eyeDeltaY}px)`;
        eyeDisplayRightRef.current.style.transform = `translateX(${eyeDeltaX}px) translateY(${eyeDeltaY}px)`;
        
        const glowIntensity = Math.abs(deltaX) + Math.abs(deltaY) + powerBoost;
        const boxShadow = `0 0 ${10 + glowIntensity * 8}px rgba(255, 215, 0, ${0.7 + powerBoost * 0.3})`;
        
        eyeDisplayLeftRef.current.style.boxShadow = boxShadow;
        eyeDisplayRightRef.current.style.boxShadow = boxShadow;
      }
      
      if (arcReactorRef.current) {
        arcReactorRef.current.style.opacity = powerLevel;
        arcReactorRef.current.style.boxShadow = `0 0 ${20 + powerBoost * 40}px rgba(159, 90, 253, ${0.6 + powerBoost * 0.4})`;
      }
      
      if (arcReactorInnerRef.current) {
        arcReactorInnerRef.current.style.opacity = powerLevel;
        arcReactorInnerRef.current.style.boxShadow = `0 0 ${15 + powerBoost * 25}px rgba(159, 90, 253, ${0.8 + powerBoost * 0.2})`;
      }
      
      if (arcReactorCenterRef.current) {
        arcReactorCenterRef.current.style.opacity = powerLevel;
        arcReactorCenterRef.current.style.transform = `translate(-50%, -50%) scale(${1 + powerBoost * 0.1})`;
      }
    };

    const handleMouseDown = () => {
      setHandsActive(true);
      setPowerLevel(prev => Math.min(prev + 0.3, 1));
      
      setTimeout(() => {
        setHandsActive(false);
        setPowerLevel(prev => Math.max(prev - 0.1, 0.8));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const floatInterval = setInterval(() => {
      if (!robotRef.current) return;
      
      const time = Date.now() / 2000;
      const floatY = Math.sin(time) * 5;
      
      robotRef.current.style.transform = `translateY(${floatY}px)`;
      
      if (arcReactorCenterRef.current) {
        const pulseFactor = (Math.sin(time * 2) * 0.1) + 1;
        arcReactorCenterRef.current.style.transform = `translate(-50%, -50%) scale(${pulseFactor})`;
      }
    }, 50);
    
    return () => clearInterval(floatInterval);
  }, []);

  return (
    <div className="robot-container" ref={robotRef}>
      <div className="robot">
        <div className="head" ref={headRef}>
          <div className="head-detail"></div>
          <div className="head-panel-lines"></div>
          <div className="eye-surround"></div>
          <div className="eyes">
            <div className="eye-display" ref={eyeDisplayLeftRef}></div>
            <div className="eye-display" ref={eyeDisplayRightRef}></div>
          </div>
        </div>
        <div className="neck">
          <div className="neck-power-indicator"></div>
        </div>
        <div className="body" ref={bodyRef}>
          <div className="body-panels"></div>
          <div className="arc-reactor" ref={arcReactorRef}>
            <div className="arc-reactor-inner" ref={arcReactorInnerRef}></div>
            <div className="arc-reactor-center" ref={arcReactorCenterRef}></div>
          </div>
          
          <div className="body-detail top-left"></div>
          <div className="body-detail top-right"></div>
          <div className="body-detail bottom-left"></div>
          <div className="body-detail bottom-right"></div>
          
          <div className="gold-accent chest-middle"></div>
          <div className="gold-accent chest-left"></div>
          <div className="gold-accent chest-right"></div>
          
          <div className="armor-plate chest-left"></div>
          <div className="armor-plate chest-right"></div>
          <div className="armor-plate abdomen"></div>
        </div>
        
        <div className="arm left" ref={armLeftRef}>
          <div className="shoulder-plate"></div>
          <div className="upper-arm">
            <div className="arm-panel"></div>
          </div>
          <div className="elbow"></div>
          <div className="lower-arm">
            <div className="forearm-detail"></div>
          </div>
          <div className="wrist"></div>
          <div className={`hand ${handsActive ? 'active' : ''}`} ref={handLeftRef}>
            <div className="hand-plate"></div>
          </div>
        </div>
        
        <div className="arm right" ref={armRightRef}>
          <div className="shoulder-plate"></div>
          <div className="upper-arm">
            <div className="arm-panel"></div>
          </div>
          <div className="elbow"></div>
          <div className="lower-arm">
            <div className="forearm-detail"></div>
          </div>
          <div className="wrist"></div>
          <div className={`hand ${handsActive ? 'active' : ''}`} ref={handRightRef}>
            <div className="hand-plate"></div>
          </div>
        </div>
        
        <div className="legs">
          <div className="leg">
            <div className="hip"></div>
            <div className="upper-leg">
              <div className="leg-panel"></div>
            </div>
            <div className="knee"></div>
            <div className="lower-leg">
              <div className="silver-part shin"></div>
              <div className="calf-detail"></div>
            </div>
            <div className="ankle"></div>
            <div className="foot">
              <div className="foot-detail"></div>
            </div>
          </div>
          
          <div className="leg">
            <div className="hip"></div>
            <div className="upper-leg">
              <div className="leg-panel"></div>
            </div>
            <div className="knee"></div>
            <div className="lower-leg">
              <div className="silver-part shin"></div>
              <div className="calf-detail"></div>
            </div>
            <div className="ankle"></div>
            <div className="foot">
              <div className="foot-detail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robot; 