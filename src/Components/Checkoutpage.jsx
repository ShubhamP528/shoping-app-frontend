import React, { useEffect, useState } from "react";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../features/cart";
import { useNavigate } from "react-router-dom";
import PaymentWarningPage from "./PaymentWarningPage";
import { ColorRing } from "react-loader-spinner";

const CheckoutPage = () => {
  const currentUser = useSelector((state) => state.auth?.user);
  const [receipt, setReceipt] = useState(`receipt_${Date.now()}`);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patiallyDone, setPatiallyDone] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editableAddress, setEditableAddress] = useState(null);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [addressLoading, setAddressLoading] = useState(true);
  const [newAddressLoading, setNewAddressLoading] = useState(false);
  const [editAddressLoading, setEditAddressLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
    type: "HOME",
    pincode: "",
    locality: "",
    city: "",
    state: "",
    landmark: "",
  });
  const { cartItems, status } = useSelector((state) => state.cart);
  useEffect(() => {
    let sum = 0;
    cartItems.forEach((cartItem) => {
      console.log(cartItem.quantity);
      sum += parseInt(cartItem.quantity);
    });
    setCartItemsCount(sum);
  }, [cartItems]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sum = cartItems.reduce(
      (total, item) => total + item?.product?.price * item?.quantity,
      0
    );
    setAmount(sum);
  }, [cartItems]);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  //   const addresses = [
  //     {
  //       id: 1,
  //       name: "Shubham Prajapati",
  //       phone: "9027640571",
  //       address:
  //         "23, MHW+RBP, Chauri Chaura, Mundera Bazar, Uttar Pradesh - 273201",
  //       type: "HOME",
  //     },
  //     {
  //       id: 2,
  //       name: "Shanvi Kumari",
  //       phone: "7985652144",
  //       address:
  //         "Rudra library, thana chauri chaura, Gorakhpur, Uttar Pradesh - 273201",
  //       type: "HOME",
  //     },
  //     {
  //       id: 3,
  //       name: "Shubham Prajapati",
  //       phone: "9369858761",
  //       address: "BSP office near dohra mod, Bareilly, Uttar Pradesh - 243006",
  //       type: "HOME",
  //     },
  //     {
  //       id: 4,
  //       name: "Arjun Prajapati",
  //       phone: "8057550187",
  //       address: "Shirdi industries ltd, Rudrapur, Uttarakhand - 263148",
  //       type: "HOME",
  //     },
  //   ];

  useEffect(() => {
    const getAllAddress = async () => {
      setAddressLoading(true);
      const addresses = await fetch(`${NODE_API_ENDPOINT}/all-address`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      if (!addresses.ok) {
        toast.error("error in fetching addresses");
        setAddressLoading(false);
        return;
      }
      const addressesData = await addresses.json();
      setAddresses(addressesData);
      setAddressLoading(false);
    };
    if (currentUser) {
      getAllAddress();
    }
  }, [currentUser]);

  const handleEditAddress = (id) => {
    console.log(id);
    const addressToEdit = addresses.find((addr) => addr._id === id);
    console.log(addresses);
    console.log(addressToEdit);
    console.log(addressToEdit._id);
    setEditableAddress(id);
    setAddingNewAddress(false);
    setFormValues({
      name: addressToEdit.name,
      phone: addressToEdit.phone,
      address: addressToEdit.address,
      type: addressToEdit.type,
      pincode: addressToEdit.pincode,
      locality: addressToEdit.locality,
      city: addressToEdit.city,
      state: addressToEdit.state,
      landmark: addressToEdit.landmark,
    });
  };

  const handleAddNewAddress = () => {
    setEditableAddress(null);
    setAddingNewAddress(true);
    setFormValues({
      name: "",
      phone: "",
      address: "",
      type: "HOME",
      pincode: "",
      locality: "",
      city: "",
      state: "",
      landmark: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    console.log(formValues);
    setNewAddressLoading(true);
    const addressData = await fetch(`${NODE_API_ENDPOINT}/add-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.token}`,
      },
      body: JSON.stringify(formValues),
    });
    if (!addressData.ok) {
      toast.error("Error in saving address");
      setNewAddressLoading(false);
      return;
    }
    setNewAddressLoading(false);

    const parsedData = await addressData.json();
    setAddresses((prev) => [...prev, parsedData]);
    setSelectedAddress(parsedData._id);
    alert("New address added successfully!");
    setEditableAddress(null);
    setAddingNewAddress(false);
  };

  const handleEditSaveAddress = async () => {
    console.log(formValues);
    setEditAddressLoading(true);
    const addressData = await fetch(
      `${NODE_API_ENDPOINT}/edit-address/${editableAddress}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify(formValues),
      }
    );
    if (!addressData.ok) {
      setEditAddressLoading(false);

      toast.error("Error in saving address");
      return;
    }
    setEditAddressLoading(false);

    alert("Address updated successfully!");
    setEditableAddress(null);
    setAddingNewAddress(false);
  };

  const handleCancelEdit = () => {
    setEditableAddress(null);
    setAddingNewAddress(false);
  };

  const loadRazorpay = async () => {
    if (selectedAddress === null) {
      toast.error("Please select a shipping address");
      return;
    }
    setLoading(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      setLoading(false);
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const result = await axios.post(
          `${NODE_API_ENDPOINT}/create-order`,
          {
            amount: amount + 3,
            currency: "INR",
            receipt: receipt,
            addressId: selectedAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        );
        // setIsModalOpen(false);

        console.log(result);

        const { id, currency } = result.data.razorpayOrder;
        const { _id } = result.data.createdOrder;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_ID,
          //   amount: String(amount),
          currency: currency,
          name: "Smart Solution Pvt. Ltd",
          description: "Transaction",
          order_id: id,
          handler: async function (response) {
            console.log(response);
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              _id,
              amount,
            };

            console.log(response);
            setPatiallyDone(true);
            const result = await axios.post(
              `${NODE_API_ENDPOINT}/verifyPayment`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${currentUser?.token}`,
                },
              }
            );
            setPatiallyDone(false);
            alert("Payment done successfully");
            toast.success("Your order has been placed successfully");
            setLoading(false);
            dispatch(clearCart());
            console.log(result.data);
            navigate("/orders");
          },
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: currentUser?.phoneNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log(options);

        const paymentObject = new window.Razorpay(options);

        console.log(paymentObject);
        paymentObject.open();
      } catch (error) {
        setLoading(false);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  if (patiallyDone) {
    return <PaymentWarningPage />;
  }

  if (cartItems.length === 0 && status === "loading" && status === "failed") {
    navigate("/shop");
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[90vw] md:max-w-[70vw] mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Delivery Address Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full md:w-2/3">
            <h2 className="text-lg font-semibold mb-4">DELIVERY ADDRESS</h2>
            {addressLoading ? (
              <div className="w-full flex justify-center">
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperClass="flex justify-center"
                  colors={[
                    "#131212",
                    "#131212",
                    "#131212",
                    "#131212",
                    "#131212",
                  ]}
                />
              </div>
            ) : (
              <>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border p-4 rounded-lg mb-4 ${
                      selectedAddress === address.id
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        className="mt-1 h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        checked={selectedAddress === address._id}
                        onChange={() => setSelectedAddress(address._id)}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{address.name}</h3>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600">
                          {address.address}
                        </p>
                        <p className="text-sm text-gray-500">{address.type}</p>
                      </div>
                      {selectedAddress === address._id && (
                        <button
                          onClick={() => handleEditAddress(address._id)}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          EDIT
                        </button>
                      )}
                    </label>
                    {/* Editable Address Form */}
                    {editableAddress === address._id && (
                      <div className="mt-4 border-t pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            required
                            value={formValues.name}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            name="phone"
                            required
                            value={formValues.phone}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            placeholder="Phone"
                            maxLength={10}
                            pattern="^[6-9]\d{9}$"
                            title="Phone number should be a valid Indian phone number starting with 6-9 and followed by 9 digits."
                          />
                          <input
                            type="text"
                            name="pincode"
                            value={formValues.pincode}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            pattern="^[1-9][0-9]{5}$"
                            required
                            placeholder="Pincode"
                            title="Pincode should be a valid 6-digit Indian postal code."
                          />
                          <input
                            type="text"
                            name="locality"
                            required
                            value={formValues.locality}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            placeholder="Locality"
                          />
                          <textarea
                            name="address"
                            value={formValues.address}
                            required
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full col-span-1 sm:col-span-2 text-sm sm:text-base"
                            placeholder="Address (Area and street)"
                          />
                          <input
                            type="text"
                            name="city"
                            required
                            value={formValues.city}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            placeholder="City/District/Town"
                          />
                          <input
                            type="text"
                            name="landmark"
                            value={formValues.landmark}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                            placeholder="Landmark (Optional)"
                          />
                          <select
                            name="state"
                            required
                            value={formValues.state}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                          >
                            <option value="">Select State</option>
                            {states.map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          <select
                            name="type"
                            required
                            value={formValues.type}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full text-sm sm:text-base"
                          >
                            <option value="HOME">Home</option>
                            <option value="WORK">Work</option>
                          </select>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between">
                          <button
                            onClick={handleEditSaveAddress}
                            className=" grid place-items-center w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
                          >
                            {editAddressLoading ? (
                              <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperClass="flex justify-center"
                                colors={[
                                  "#ffffff",
                                  "#ffffff",
                                  "#ffffff",
                                  "#ffffff",
                                  "#ffffff",
                                ]}
                              />
                            ) : (
                              "Save and Deliver Here"
                            )}
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm sm:text-base"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* New Address Form */}
            {addingNewAddress && (
              <div className="mt-4 border-t pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    placeholder="Name"
                    title="Provide valid name"
                  />
                  <input
                    type="text"
                    required
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    placeholder="Phone"
                    maxLength={10}
                    pattern="^[6-9]\d{9}$"
                    title="Phone number should be a valid Indian phone number starting with 6-9 and followed by 9 digits."
                  />
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formValues.pincode}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    pattern="^[1-9][0-9]{5}$"
                    placeholder="Pincode"
                    title="Pincode should be a valid 6-digit Indian postal code."
                  />
                  <input
                    type="text"
                    name="locality"
                    required
                    value={formValues.locality}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    placeholder="Locality"
                  />
                  <textarea
                    name="address"
                    required
                    value={formValues.address}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full col-span-1 sm:col-span-2 text-sm sm:text-base"
                    placeholder="Address (Area and street)"
                  />
                  <input
                    type="text"
                    name="city"
                    required
                    value={formValues.city}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    placeholder="City/District/Town"
                  />
                  <input
                    type="text"
                    name="landmark"
                    value={formValues.landmark}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                    placeholder="Landmark (Optional)"
                  />
                  <select
                    name="state"
                    required
                    value={formValues.state}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <select
                    name="type"
                    required
                    value={formValues.type}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full text-sm sm:text-base"
                  >
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                  </select>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between">
                  <button
                    onClick={handleSaveAddress}
                    className=" grid place-items-center w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
                  >
                    {newAddressLoading ? (
                      <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="color-ring-loading"
                        wrapperClass="flex justify-center"
                        colors={[
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                        ]}
                      />
                    ) : (
                      "Save New Address"
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {!addingNewAddress && (
              <div
                onClick={handleAddNewAddress}
                className="mt-4 px-6 py-2 rounded-md border border-gray-300 text-blue-600 cursor-pointer"
              >
                + Add a new address
              </div>
            )}
          </div>

          {/* Price Details Section */}
          <div className="bg-white shadow-md rounded-lg p-4 sticky top-28 max-h-fit w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>
            <div className="text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span>Price ({cartItemsCount} item)</span>
                <span>{amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Platform Fee</span>
                <span>₹3</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total Payable</span>
                <span>₹{amount + 3}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={loadRazorpay}
            type="submit"
            className="bg-green-500 text-white py-2 px-4 text-lg rounded hover:bg-green-600 w-full sm:w-auto grid place-items-center"
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperClass="flex justify-center"
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
              />
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
