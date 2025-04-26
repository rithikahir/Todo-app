import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const CompletedPopup = ({ isVisible, onClose, isDarkMode }) => {
  const popupRef = useRef();

  useEffect(() => {
    if (isVisible) {
      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Auto close after 2.5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={popupRef}
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50  border px-6 py-4 rounded-lg shadow-lg animate-bounce ${
        isDarkMode
          ? "bg-gray-900 border-gray-500 border-2"
          : "bg-white border-green-400 "
      }`}
    >
      <h3 className="text-xl font-bold text-green-600 text-center">
        ✅ Task Completed!
      </h3>
      <p
        className={`text-sm text-center mt-1 ${
          isDarkMode ? "text-gray-300" : "text-gray-600 "
        }`}
      >
        Well done! Keep going 💪
      </p>
    </div>
  );
};

export default CompletedPopup;
