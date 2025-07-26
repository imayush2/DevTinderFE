import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 rounded-2xl text-center shadow-md border border-gray-200 text-gray-500">
        No user data available
      </div>
    );
  }

  const { firstName, lastName, age, photoUrl, gender, about, skills, _id } = user;

  const handleConnections = async (status, _id) => {
    await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
    dispatch(removeFeed(_id));
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out">
      {/* ✅ Image Section */}
      <figure className="relative h-56 overflow-hidden">
        <img
          src={photoUrl || "https://via.placeholder.com/300x200.png?text=User"}
          alt={`${firstName} ${lastName}`}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md">
          {age} yrs
        </div>
      </figure>

      {/* ✅ Card Body */}
      <div className="p-5 flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 capitalize">
          {firstName} {lastName}
        </h2>
        <h3 className="text-sm text-gray-500 mb-2">{gender}</h3>
        <p className="text-gray-600 text-sm italic mb-3">"{about || 'No bio available'}"</p>

        {/* ✅ Skills Section */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full border border-blue-200 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* ✅ Action Buttons */}
        <div className="flex justify-between gap-3 mt-auto">
          <button
            className="flex-1 py-2 rounded-lg bg-red-100 text-red-600 font-semibold border border-red-300 hover:bg-red-200 transition"
            onClick={() => handleConnections("ignored", _id)}
          >
             Ignore
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-green-100 text-green-700 font-semibold border border-green-300 hover:bg-green-200 transition"
            onClick={() => handleConnections("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
