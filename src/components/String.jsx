'use client'
import styles from '../app/page.module.css'
import { useRef, useEffect } from 'react';

export default function String({ yShift, stringWidth, stringID }) {

  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;
  const MAX_BEND = 40;

  useEffect(() => {
    setPath(progress);
  }, [])

  const setPath = (progress) => {
    const width = window.innerWidth * 0.7;
    path.current.setAttributeNS(null, "d", `M41.9196 ${yShift} Q${(stringWidth ?? width) * x} ${yShift + progress}, ${stringWidth ?? width} ${yShift}`);
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const manageMouseEnter = () => {
    if(reqId){
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const pathBound =  path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    if (Math.abs(progress + movementY) < MAX_BEND) {
        progress+= movementY;
        setPath(progress);
    }
  }

  const manageMouseLeave = () => {
    animateOut();
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time+=0.2;
    setPath(newProgress);
    if(Math.abs(progress) > 0.75){
      reqId = requestAnimationFrame(animateOut);
    }
    else{
      resetAnimation();
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  }

  function playSound() {
    let sound; 
    if (stringID === "G") sound = new Audio('g-string.mp3');
    else if (stringID === "C") sound = new Audio('c-string.mp3');
    else if (stringID === "E") sound = new Audio('e-string.mp3');
    else if (stringID === "A") sound = new Audio('a-string.mp3');

    sound.muted = true;
    sound.muted = false;

    sound.play();
  }

  return (
    <>
      <foreignObject x={0} y={yShift} width="200" height="100" className={styles.line}>
          <div
              onMouseEnter={() => {
                playSound();
                manageMouseEnter();
              }}
              onMouseMove={(e) => {manageMouseMove(e)}}
              onMouseLeave={() => {manageMouseLeave()}}
              className={styles.box}
          />
      </foreignObject>
      <path ref={path} stroke='white' fill='transparent'></path>
    </>
  );
}
