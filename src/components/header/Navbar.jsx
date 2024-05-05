import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";
function Navbar({ setToggle, toggle }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-house"></i>
          Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-stickies"></i>
          Post
        </Link>
        {user && (
          <>
            <Link
              to="/posts/create"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <PostAddIcon />
              Create
            </Link>
          </>
        )}
        {user?.isAdmin && (
          <>
            <Link
              to="/admin-dashboard"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="bi bi-person-check"></i>
              Admin Dashboar
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
