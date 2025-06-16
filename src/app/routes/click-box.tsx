import gsap from "gsap";
import React, { useRef } from "react";

type ClickBoxProps = {
    callSound?: () => void;
    onCallBack?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;;
export function ClickBox({ callSound, onCallBack }: ClickBoxProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const handleClick = () => {
        if (!boxRef.current) return;
        callSound && callSound();

        const tl = gsap.timeline({
            onComplete: () => {
                if (boxRef.current) {
                    onCallBack && onCallBack();
                    boxRef.current.style.display = 'none';
                }
            }
        });

        tl.fromTo(
            boxRef.current,
            { scale: 1, rotation: 0, opacity: 1 },
            {
                scale: 20,
                // rotation: 20,
                duration: 0.8,
                ease: "power1.out",
                // yoyo: true,
                // repeat: 1,
            }
        );

        tl.to(boxRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
        }, "+=0.1");
    };


    return (
        <div
            ref={boxRef}
            onClick={handleClick}
            className="w-48 h-48 rounded-xl mx-auto cursor-pointer"
        >
            <img src="/photo.png" alt="" srcSet="" />
        </div>
    );
};

export default ClickBox;
