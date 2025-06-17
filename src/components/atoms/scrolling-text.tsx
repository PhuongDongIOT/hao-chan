import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type ScrollingTextProps = {
    duration?: number;
    text?: string;
}
export default function ScrollingText({ duration = 1, text = 'Velocity GSAP Text' }: ScrollingTextProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(textRef.current, {
            x: '-100%',
            repeat: -1,
            duration: duration,
            ease: 'linear',
        });
    }, []);

    return (
        <div className="overflow-hidden whitespace-nowrap mt-10">
            <div ref={textRef} className="text-playfair-display inline-block text-6xl lg:text-8xl font-bold px-4">
                {text} 👾⚡️ {text} 👾⚡️ {text} 👾⚡️ {text} 👾⚡️
            </div>
        </div>
    );
}

