import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/96394e0900c8983c.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/fac0652bee3b3e64.jpg?q=20",
    // "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2f9efb9834ed1ae5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8074e7b2f6d2bfea.jpg?q=20",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="h-44 w-full m-auto pt-2 px-4 relative group">
      {/* Image Display */}
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="rounded-md w-full h-full object-fill"
        />
      </div>

      {/* Left Arrow */}
      <div
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer"
        onClick={prevSlide}
      >
        ❮
      </div>

      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer"
        onClick={nextSlide}
      >
        ❯
      </div>

      {/* Dots */}
      <div className="flex justify-center pt-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer h-2 w-2 bg-gray-300 rounded-full mx-2 ${
              currentIndex === index ? "bg-blue-600" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
