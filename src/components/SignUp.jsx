import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, age, gender, about, skills },
        { withCredentials: true }
      );
      setSuccess("✅ Account created successfully! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data || "Signup failed. Try again!");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-[400px] p-8 mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">First Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Last Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Age</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Gender</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">About You</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write something about yourself..."
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
            value={skills.join(",")}
            onChange={(e) =>
              setSkills(e.target.value.split(",").map((s) => s.trim()))
            }
            placeholder="Enter skills e.g. React, Node.js"
            required
          />
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow-md transition duration-300"
        >
          ✅ Sign Up
        </button>

        {/* Link to Login */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
