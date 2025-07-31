import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  // ✅ Extract user from Redux store
  const user = useSelector((state) => state.user); // adjust path if needed
  const isPremium = user?.isPremium;
  const membershipType = user?.membershipType;

  // ✅ Razorpay handler (only needed if user is not premium)
  const handlePurchase = async (plan) => {
    const { data } = await axios.post(
      BASE_URL + "/payment/create",
      { memberType: plan },
      { withCredentials: true }
    );

    const options = {
      key: "rzp_test_omQfE0vKM4nac8",
      amount: data.amount,
      currency: data.currency,
      name: "CoderMate",
      description: `Purchase ${plan} Membership`,
      order_id: data.razorpayOrderId,
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        // ✅ Refresh page to fetch updated user info from backend
        window.location.reload();
      },
      
      prefill: {
        name: `${data.notes.firstName} ${data.notes.lastName}`,
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: { membership: plan },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ If user is already premium, show premium message
  if (isPremium) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
        <h1 className="text-3xl font-bold text-green-700">
          🎉 You are already a Premium User!
        </h1>
        <p className="mt-3 text-lg text-gray-700">
          Membership Type: <span className="font-semibold">{membershipType}</span>
        </p>
      </div>
    );
  }

  // ✅ Otherwise, show membership plans
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Choose Your Membership Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Silver Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700">Silver Membership</h2>
          <p className="mt-3 text-gray-600">Basic access to premium features</p>
          <p className="mt-4 text-3xl font-bold text-blue-500">
            $10<span className="text-lg text-gray-500">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔️ Access to standard content</li>
            <li>✔️ Monthly newsletter</li>
            <li>✔️ Email support</li>
          </ul>
          <button
            onClick={() => handlePurchase("Silver")}
            className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Buy Silver
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-yellow-300 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700">Gold Membership</h2>
          <p className="mt-3 text-gray-600">Full access with exclusive benefits</p>
          <p className="mt-4 text-3xl font-bold text-yellow-500">
            $25<span className="text-lg text-gray-500">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔️ All Silver features</li>
            <li>✔️ Exclusive premium content</li>
            <li>✔️ Priority support</li>
            <li>✔️ Free access to webinars</li>
          </ul>
          <button
            onClick={() => handlePurchase("Gold")}
            className="mt-6 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
