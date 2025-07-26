import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // ✅ Load user data into state when user prop changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      const updatedUser = { firstName, lastName, age, gender, about, photoUrl };
      const res = await axios.patch(BASE_URL + "/profile/edit", updatedUser, { withCredentials: true });
  
      if (res.status === 200) {
        toast.success("✅ Profile updated successfully!");
        dispatch(addUser(updatedUser));
      } else {
        toast.error("⚠️ Failed to update profile!");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Error updating profile. Try again!");
    }
  };
  

  // ✅ Construct updated user object to pass to UserCard
  const liveUserPreview = {
    ...user, // keeps other properties like id, skills
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
  };

  return (
    <div className="flex justify-center gap-20">
      {/* Edit Form */}
      <div className="flex justify-center my-10 w-[450px]">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            ✏️ Edit Profile
          </h2>

          {/* FORM FIELDS */}
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                About
              </label>
              <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Save Button */}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300 shadow"
              onClick={handleSaveProfile}
            >
              💾 Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* ✅ User Card LIVE PREVIEW */}
      <div className="flex justify-center my-8 mt-30">
        <div className="w-full max-w-md">
          <UserCard user={liveUserPreview} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />

    </div>
  );
};

export default EditProfile;
