import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      console.log("Calling API...");
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("this is feed", res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("some error occured");
    }
  };
  useEffect(() => {
    console.log("useEffect called");
    getFeed();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 my-10">
      {feed?.map((user) => (
        <UserCard key={user._id} user={user} /> 
      ))}
    </div>
  );
};

export default Feed;
