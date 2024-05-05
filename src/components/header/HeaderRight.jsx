import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

function HeaderRight() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const logouthandler = () => {
    setDropdown(false)
    dispatch(logoutUser())
  }
  return (
    <div className="header-right">
      {user ? (
       
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((pre) => !pre)}
              className="header-right-username"
            >
              {user?.username}
            </span>
            <img
              className="header-right-user-photo"
              src={user?.profilePhoto?.url}
              alt="user photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  onClick={() => setDropdown(false)}
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logouthandler} className="header-dropdown-item">
                  <i className="bi bi-arrow-in-left"></i>
                  <span>logout</span>
                </div>
              </div>
            )}
          </div>
      
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <LoginIcon />
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <PersonAddAltIcon />
            <span>Sign up</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default HeaderRight;
