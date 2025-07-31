import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { clearFeed, removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  // console.log("this is user from navbar", user);
  // console.log("firstname",user?.firstName);
  // console.log(user?.photoUrl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout =  async(req,res) => {
    try{
      await axios.post(BASE_URL+"/logout", {}, {withCredentials : true});
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");


    }catch(error){
      console.log("error", error);
      res.status(400).send("some error occured");
    }

  } 

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">CoderMate</Link>
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            {/* Name and avatar side by side */}
            <div className="flex items-center gap-3">
              <p className="font-medium text-sm">Welcome {user?.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={user?.photoUrl} />
                </div>
              </div>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
