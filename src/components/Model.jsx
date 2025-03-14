import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModelView } from "./ModelView";
import { yellowImg } from "../utils";
import animatewithGsaptimeline from "../utils/animation"
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
    const [size, setSize] = useState("small");
    const [model, setModel] = useState({
        title: "Iphone 15 Pro in Natural Titanium",
        img: yellowImg,
        color: ["#8F8A81", "#FFE789", "#6F6EF4"],
    });

    // Camera control for Model View
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // Groups
    const small = useRef(null); // ✅ Keep these refs attached to Three.js elements
    const large = useRef(null);

    // Rotation states
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const tl = useRef(gsap.timeline()); // ✅ Use useRef for GSAP timeline

    // ✅ Run animation only when refs exist
    useEffect(() => {
        if (!small.current || !large.current) return; // ✅ Avoid crashes due to undefined refs

        if (size === "large") {
            animatewithGsaptimeline(
                tl.current,
                small,
                smallRotation,
                "#view1",
                "#view2",
                {
                    transform: "translateX(-100%)", // ✅ Removed brackets []
                    duration: 2,
                }
            );
        } else {
            animatewithGsaptimeline(
                tl.current,
                small,
                smallRotation,
                "#view2",
                "#view1",
                {
                    transform: "translateX(0)", // ✅ Corrected format
                    duration: 2,
                }
            );
        }
    }, [size, smallRotation]); // ✅ Include rotation state in dependency

    // GSAP Animation
    useGSAP(() => {
        gsap.to("#heading", { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
    });

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="text-gray-400 opacity-0 lg:text-3xl font-medium translate-y-20">
                    Take a closer look
                </h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small} // ✅ This should be passed correctly
                            gsaptype="view1"
                            cameraRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large} // ✅ Passed correctly
                            gsaptype="view2"
                            cameraRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />
                        <Canvas
                            className="w-full h-full"
                            eventSource={document.getElementById("root")}
                            style={{
                                position: "fixed",
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                overflow: "hidden",
                            }}
                        >
                            <View.Port />
                        </Canvas>
                    </div>
                    <div className="mx-auto w-full">
                        <p className="font-light text-sm text-center mb-5">{model.title}</p>
                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, i) => (
                                    <li
                                        key={i}
                                        className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                        style={{ backgroundColor: item.color[0] }}
                                        onClick={() => setModel(item)}
                                    >
                                    </li>
                                ))}
                            </ul>
                            <button className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <span
                                        key={label}
                                        style={{
                                            backgroundColor: size === value ? "white" : "transparent",
                                            color: size === value ? "black" : "white",
                                        }}
                                        className="size-btn"
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Model;
