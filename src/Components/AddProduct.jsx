import React, { useState } from "react";
import { NODE_API_ENDPOINT } from "../utils/utils";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    images: [""],
    rating: "",
    description: "",
    highlights: [""],
    features: [""],
    featured: false,
    category: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Electronics",
    "Audio",
    "Wearables",
    "Smart Home",
    "Furniture",
    "Computers",
    "Home Entertainment",
    "Kitchen Appliances",
    "Peripherals",
    "Cameras",
    "Home Appliances",
    "Personal Care",
  ];

  const validateForm = () => {
    const errors = {};
    [
      "name",
      "price",
      "originalPrice",
      "rating",
      "description",
      "category",
    ].forEach((field) => {
      if (!formData[field]) errors[field] = "This field is required";
    });
    if (formData.price < 0 || formData.originalPrice < 0) {
      errors.price = "Price cannot be negative";
    }
    if (formData.rating < 0 || formData.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayField = (arrayName) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${NODE_API_ENDPOINT}/add-product`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to add product");
        alert("Product added successfully!");
        setFormData({
          name: "",
          price: "",
          originalPrice: "",
          images: [""],
          rating: "",
          description: "",
          highlights: [""],
          features: [""],
          featured: false,
          category: "",
        });
      } catch (error) {
        setFormErrors({ general: error.message });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Add New Product
        </h2>
        {["name", "price", "originalPrice", "rating", "description"].map(
          (field) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="font-semibold text-gray-700 mb-1">
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "price" || field === "originalPrice"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field}`}
              />
              {formErrors[field] && (
                <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
              )}
            </div>
          )
        )}
        <div className="flex flex-col mb-4">
          <label className="font-semibold text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formErrors.category && (
            <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
          )}
        </div>
        {["images", "highlights", "features"].map((arrayField) => (
          <div key={arrayField} className="flex flex-col mb-4">
            <label className="font-semibold text-gray-700 mb-1">
              {arrayField}
            </label>
            {formData[arrayField].map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleArrayChange(e, index, arrayField)}
                className="p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Add ${arrayField.slice(0, -1)}`}
              />
            ))}
            <button
              type="button"
              onClick={() => addArrayField(arrayField)}
              className="text-blue-500 text-sm"
            >
              + Add {arrayField.slice(0, -1)}
            </button>
          </div>
        ))}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2 h-5 w-5 text-blue-600 focus:ring-0"
          />
          <label className="font-semibold text-gray-700">
            Featured Product
          </label>
        </div>
        {formErrors.general && (
          <p className="text-red-500 text-sm text-center mb-4">
            {formErrors.general}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          {isSubmitting ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
