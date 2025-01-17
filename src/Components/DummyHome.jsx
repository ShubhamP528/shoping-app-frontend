import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-900">Claw</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#products" className="text-gray-600 hover:text-gray-900">
              Products
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            Shop Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-cover bg-center h-[80vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
      >
        <div className="text-center text-white max-w-xl px-4">
          <h2 className="text-5xl font-bold mb-4">Discover the Perfect Fit</h2>
          <p className="text-lg mb-6">
            Find your style with our exclusive collections.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100">
            Explore Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example product card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/product1.jpg"
                alt="Product"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-800">
                  Product Name
                </h4>
                <p className="text-gray-600 mt-2">$49.99</p>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Repeat product card as needed */}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example testimonial */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                "Fantastic products and great customer service!"
              </p>
              <div className="mt-4">
                <span className="font-bold text-gray-800">- Alex J.</span>
              </div>
            </div>
            {/* Repeat testimonial block */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Claw. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
