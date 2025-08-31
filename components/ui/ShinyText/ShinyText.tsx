import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  variant?: "primary" | "subtle";
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = "",
  variant = "primary",
}) => {
  const animationDuration = `${speed}s`;

  const getBackgroundImage = () => {
    if (variant === "subtle") {
      return "linear-gradient(120deg, rgba(107, 114, 128, 0.8) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(107, 114, 128, 0.8) 100%)";
    }
    return "linear-gradient(120deg, rgba(139, 92, 246, 0.8) 0%, rgba(255, 255, 255, 1) 50%, rgba(88, 28, 135, 0.8) 100%)";
  };

  return (
    <span
      className={`bg-clip-text text-transparent inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
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
