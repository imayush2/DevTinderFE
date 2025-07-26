import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { removeConnections } from "../utils/connectionSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.allRequest));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleRequest = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    dispatch(removeRequest(_id));

  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Received Requests</h2>

      {requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              {/* ✅ Sender Photo */}
              <img
                src={req.fromUserId.photoUrl}
                alt={`${req.fromUserId.firstName} ${req.fromUserId.lastName}`}
                className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-blue-300"
              />

              {/* ✅ Sender Name */}
              <h3 className="font-bold text-xl text-gray-800">
                {req.fromUserId.firstName} {req.fromUserId.lastName}
              </h3>

              {/* ✅ Gender & Age */}
              <p className="text-gray-500 text-sm mb-2">
                {req.fromUserId.gender} • {req.fromUserId.age} yrs
              </p>

              {/* ✅ About */}
              <p className="text-gray-600 text-sm mb-3 px-2">
                {req.fromUserId.about}
              </p>

              {/* ✅ Skills (if available) */}
              {req.fromUserId.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {req.fromUserId.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* ✅ Status Badge */}
              <span
                className={`mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                  req.status === "interested"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }`}
              >
                {req.status}
              </span>

              {/* ✅ Action Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition"
                  onClick={()=>handleRequest("accepted",req._id)}
                >
                  Accept
                </button>
                <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition" onClick={()=>handleRequest("rejected",req._id)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">No requests found.</p>
      )}
    </div>
  );
};

export default Request;
