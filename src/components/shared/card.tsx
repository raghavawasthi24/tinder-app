// import React from "react";
// import {
//     motion,
//     useMotionValue,
//     useTransform,
//     useAnimation,
// } from "framer-motion";
// // import "./index.css";

// // Card component with destructured props
//  const Card = ({ image, color }) => {
//     // Motion values for x-axis dragging
//     const x = useMotionValue(0);

//     // Rotate the card based on x position
//     const rotate = useTransform(x, [-200, 200], [-50, 50]);

//     // Fade out as card moves away from center
//     const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

//     // Animation controller
//     const controls = useAnimation();

//     // Card styling
//     const style = {
//         backgroundImage: `url(${image})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "contain",
//         backgroundColor: color,
//         boxShadow: "5px 10px 18px #888888",
//         borderRadius: 10,
//         height: 300,
//     };

//     return (
//         <div className="App">
//             <motion.div
//                 drag="x"
//                 dragConstraints={{ left: -1000, right: 1000 }}
//                 style={{ ...style, x, rotate, opacity }}
//                 animate={controls}
//                 onDragEnd={(event, info) => {
//                     if (Math.abs(info.point.x) <= 150) {
//                         controls.start({ x: 0 });
//                     } else {
//                         controls.start({
//                             x: info.point.x < 0 ? -200 : 200,
//                             opacity: 0,
//                         });
//                     }
//                 }}
//             />
//         </div>
//     );
// };

// export default Card;