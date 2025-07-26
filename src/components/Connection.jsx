import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, removeConnections } from "../utils/connectionSlice";

const Connection = () => {
  const dispatch = useDispatch();

  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/conncetion`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
     
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Meet Your Connections
      </h2>

      {connections && connections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {connections.map((conn) => (
            <div
              key={conn._id}
              className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition transform duration-300 ease-in-out flex flex-col items-center text-center"
            >
              <div className="relative">
                <img
                  src={conn.photoUrl}
                  alt={`${conn.firstName} ${conn.lastName}`}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md mb-3"
                />
                <span className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {conn.firstName} {conn.lastName}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {conn.gender} • {conn.age} yrs
              </p>

              <p className="text-gray-600 text-sm mt-3 px-3 italic">
                "{conn.about}"
              </p>

              {/* ✅ Skills Section */}
              {conn.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {conn.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No connections found.
        </p>
      )}
    </div>
  );
};

export default Connection;
