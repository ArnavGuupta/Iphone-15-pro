import gsap from "gsap";

const animatewithGsaptimeline = (timeline, rotationRef, firstTarget, secondTarget, animationProps) => {
    if (!rotationRef?.current) return; // Prevent undefined errors

    // Animate the model's rotation
    timeline.to(rotationRef.current.rotation, {
        y: "+=1.5", 
        duration: 2,
        ease: "power2.inOut",
    });

    // Animate UI elements
    timeline.to(firstTarget, { ...animationProps, ease: "power2.inOut" }, "<");
    timeline.to(secondTarget, { ...animationProps, ease: "power2.inOut" }, "<");
};

export default animatewithGsaptimeline;
