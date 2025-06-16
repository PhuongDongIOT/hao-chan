import { useRef } from 'react';
import gsap from 'gsap';
import useSound from 'use-sound';
import ClickBox from './click-box';
import clickSfx from '../../assets/sounds/click.wav';

const boxColors = ['#ff4d4f', '#40a9ff', '#faad14', '#faad14', '#faad14'];

const LandingRoute = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoboRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [play, { stop, pause }] = useSound(clickSfx, {
    volume: 1
  });

  const handlePlay = () => {
    audioRef.current?.play();
    if (divRef.current) divRef.current.style.display = 'block';

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out', duration: 1 }
    });

    let i = 0;
    tl.from('.box', {
      opacity: 0,
      y: 40,
      stagger: {
        each: 1.1,
        onStart: function (index) {
          gsap.to(document.body, {
            backgroundColor: boxColors[i % boxColors.length],
            duration: 0.8
          });
          i++;
        }

      }
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
        }
      });;
      if (videoRef.current) {
        videoRef.current.style.display = 'block';
        gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      }
    }
  };

  return (
    <>
      <div className='min-h-screen h-screen w-screen bg-gray-240 flex items-center justify-center overflow-hidden'>
        <ClickBox callSound={() => play()} onCallBack={() => handlePlay()} />
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
          <div className='box w-28 h-28 bg-blue-300 rounded-md overflow-hidden flex items-center justify-center'>
            <img src='/image-1.png' alt='' srcSet='' className='w-full h-full object-cover' />
          </div>
          <div className='box w-28 h-28 bg-blue-300 rounded-md overflow-hidden flex items-center justify-center'>
            <img src='/image-2.png' alt='' srcSet='' className='w-full h-full object-cover' />
          </div>
          <div className='box w-28 h-28 bg-blue-300 rounded-md overflow-hidden flex items-center justify-center'>
            <img src='/image-3.png' alt='' srcSet='' className='w-full h-full object-cover' />
          </div>
          <div className='box w-28 h-28 bg-blue-300 rounded-md overflow-hidden flex items-center justify-center'>
            <img src='/image-4.png' alt='' srcSet='' className='w-full h-full object-cover' />
          </div>
          <div className='box w-28 h-28 bg-blue-300 rounded-md overflow-hidden flex items-center justify-center'>
            <img src='/image-5.png' alt='' srcSet='' className='w-full h-full object-cover' />
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
    </>
  );
};

export default LandingRoute;
