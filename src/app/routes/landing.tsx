import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import useSound from 'use-sound';
import { boxColors, clipPathShape, imageSources } from '@/constants';
import ClickBox from '@/components/atoms/click-box';

import clickSfx from '../../assets/sounds/click.wav';
import groovyAnimation from '../../assets/jsons/animation.json';
import ScrollingText from '../../components/atoms/scrolling-text';

const LandingRoute = () => {
  const [text, setText] = useState<string>('DANGEROUS');
  const [isShow, setIsShow] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoboRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const divWarningRef = useRef<HTMLDivElement>(null);

  const [play] = useSound(clickSfx, { volume: 1 });

  useEffect(() => {
    if (divWarningRef.current) {
      gsap.from(divWarningRef.current, {
        opacity: 1,
        y: -50,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, []);

  const handlePlay = () => {
    setText('HÀO CHAN');
    divWarningRef.current!.style.display = 'none';
    audioRef.current?.play();
    divRef.current!.style.display = 'block';

    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } });
    let i = 0;

    tl.from('.box', {
      opacity: 0,
      y: 40,
      stagger: {
        each: 1.1,
        onStart: () => {
          gsap.to(document.body, {
            backgroundColor: boxColors[i % boxColors.length],
            duration: 0.8,
          });
          i++;
        },
      },
    })
      .to(divRef.current, {
        opacity: 0,
        duration: 0.4,
      })
      .add(() => {
        if (divRef.current) {
          divRef.current.style.display = 'none';
          divRef.current.style.opacity = '1';
        }
        if (videoBoboRef.current) {
          videoBoboRef.current.style.display = 'block';
          gsap.fromTo(videoBoboRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
          setIsShow(false);
        }
      });
  };

  const handleVideoEnded = () => {
    if (videoBoboRef.current) {
      gsap.to(videoBoboRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -100,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          videoBoboRef.current!.style.display = 'none';
        },
      });
      if (videoRef.current) {
        videoRef.current.style.display = 'block';
        gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      }
    }
  };

  return (
    <div className='min-h-screen h-screen w-screen bg-gray-240 flex items-center justify-center overflow-hidden'>
      {isShow ? <div className='absolute h-screen w-screen z-0 overflow-hidden'>
        <div className='transform -rotate-45 relative -left-[90%] lg:-left-[10%] -top-[90%] w-[2000px] lg:-top-[70%]'>
          {[9, 10, 11, 12, 9, 12, 10, 11, 10, 12].map((duration, idx) => (
            <ScrollingText key={idx} duration={duration} text={text} />
          ))}
        </div>
      </div> : null}

      <div ref={divWarningRef} className='fixed top-[5%] lg:top-[10%] flex justify-center flex-col items-center'>
        <div className='w-44 h-44'>
          <Lottie animationData={groovyAnimation} loop />
        </div>
        <p className='text-6xl lg:text-7xl text-black text-dancing-script relative -top-8 lg:-top-12'>Basshunter</p>
      </div>

      <ClickBox callSound={play} onCallBack={handlePlay} />

      <audio ref={audioRef} src='/music.mp3' preload='auto' className='hidden' />

      <video
        ref={videoRef}
        src='/video.mp4'
        autoPlay
        loop
        muted
        playsInline
        className='hidden fixed top-0 left-0 w-screen h-screen object-cover shadow-lg transition-opacity duration-300'
      />

      <div ref={divRef} className='hidden space-y-2'>
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
          {imageSources.map((src, idx) => (
            <div key={idx} className='box w-28 h-28 md:w-44 md:h-44 rounded-md overflow-hidden flex items-center justify-center'>
              <img src={src} alt='' className='w-full h-full object-cover' style={{ clipPath: clipPathShape }} />
            </div>
          ))}
        </div>
      </div>

      <video
        ref={videoBoboRef}
        src='/meme-bobo.mp4'
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className='mx-auto hidden fixed top-0 left-[50%] transform -translate-x-[50%] w-auto h-screen object-cover shadow-lg transition-opacity duration-300'
      />
    </div>
  );
};

export default LandingRoute;
