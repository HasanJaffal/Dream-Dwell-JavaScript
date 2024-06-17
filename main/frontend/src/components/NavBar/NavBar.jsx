/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import axios from "axios";

function NavBar({
  label1,
  label2,
  label3,
  label4,
  label5,
  onClick1,
  onClick2,
  onClick3,
  onClick4,
  onClick5,
}) {
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    setUser(storedData);
  }, []);
  const navigate = useNavigate();
  const SignOutHandler = async () => {
    const token = localStorage.getItem("token");
    // Clear local storage
    await axios.get("http://localhost:4000/api/auth/signout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(false);
    // Redirect to the login page
    navigate("/");
  };

  const [showLogout, setShowLogout] = useState(false);

  const handleClick = () => {
    // Toggle the showLogout state when clicked
    setShowLogout(!showLogout);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between text-white z-10 scroll-m-0">
      <div className="flex justify-between items-center px-4 sm:px-0 py-3 sm:py-0">
        <div className="icon">
          <img
            src="public/logo-nav.png"
            alt="DREAM DWELL"
            className="logo-image"
          />
        </div>
        <FiAlignJustify
          className={`sm:hidden grid my-auto text-4xl cursor-pointer ${
            toggle ? "hidden" : "block"
          }`}
          onClick={() => setToggle(!toggle)}
        />
        <TfiClose
          className={`sm:hidden grid my-auto text-4xl cursor-pointer ${
            toggle ? "block" : "hidden"
          }`}
          onClick={() => setToggle(!toggle)}
        />
      </div>
      <div
        className={`sm:flex transition-all  mx-2 sm:bg-blue-500 z-10 flex-col sm:flex-row gap-4 ${
          toggle ? "flex max-h-max opacity-100" : "hidden"
        } `}
      >
        {[1, 2, 3, 4, 5].map((index) => {
          const onClickHandler = eval(`onClick${index}`);
          const label = eval(`label${index}`);

          return (
            onClickHandler &&
            label && (
              <p
                key={index}
                className="sm:hover:bg-transparent sm:hover:text-white sm:hover:underline hover:bg-white hover:text-blue-500 rounded cursor-pointer sm:py-8 py-3 -my-1 sm:-my-4 "
                onClick={() => {
                  onClickHandler();
                  setToggle(false); // Close the menu when an item is clicked
                }}
              >
                {label}
              </p>
            )
          );
        })}{" "}
        {user ? (
          <div className="gap-2 sm:pt-5 grid">
            <span
              className="cursor-pointer text-white text-sm hover:bg-white hover:text-blue-500 sm:hover:bg-transparent sm:hover:text-white sm:hover:underline py-3 rounded sm:py-0"
              onClick={handleClick}
            >
              {user["firstName"]} {user["lastName"]}
            </span>
            {showLogout && (
              <Link to="../SignUp.jsx">
                <p
                  className="bg-blue-500 py-2 rounded sm:hover:underline sm:hover:bg-transparent hover:bg-white hover:text-red-500"
                  onClick={SignOutHandler}
                >
                  Logout
                </p>
              </Link>
            )}
          </div>
        ) : (
          <Link to="./sign-in">
            <p className="text-white hover:underline  pt-4">Sign in</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
