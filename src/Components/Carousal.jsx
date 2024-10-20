import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/ec29d9b3b0a537d1.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/1e31c9d65e3b4592.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/df5fc1c522d37039.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/d61ef11b1f46353f.jpeg?q=20",
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
      nextSlide(); // Automatically moves to the next slide
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup to avoid memory leaks
  }, [currentIndex]); // Runs whenever currentIndex changes

  return (
    <div className=" h-44 w-full m-auto pt-8 px-4 relative group ">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full bg-center bg-cover duration-500 rounded-md"
      ></div>
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
      <div className="flex justify-center py-2">
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
