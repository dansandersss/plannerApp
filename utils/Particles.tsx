// components/BackgroundParticles.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const BackgroundParticles = ({ src }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const moveX = (clientX / windowWidth) * 20 - 10;
      const moveY = (clientY / windowHeight) * 20 - 10;

      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        ease: "power1.out",
        duration: 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <Image
        ref={imageRef}
        src={src}
        alt="background particles"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BackgroundParticles;
