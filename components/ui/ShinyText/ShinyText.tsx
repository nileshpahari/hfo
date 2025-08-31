import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(139, 92, 246, 0.8) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(88, 28, 135, 0.8) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
