import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/cuvette_logo.png";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { setUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Clear local storage
      localStorage.removeItem("authToken");

      // Clear user data from Redux store
      dispatch(setUser(null));

      // Navigate to signup page
      navigate("/signup");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 mx-16">
      <img
        src={Logo}
        alt="Cuvette Logo"
        className="w-32 cursor-pointer"
        onClick={() => navigate("/home")}
      />
      <div className="text-[#576474] flex items-center font-semibold cursor-pointer">
        Contact
        {userData && (
          <div className="relative group ml-5 flex items-center">
            {/* Profile Info */}
            <div className="border-2 px-2 py-1 flex items-center gap-3">
              <CgProfile size={20} />
              {userData.name}
              <TiArrowSortedDown size={20} />
            </div>

            {/* Logout Button */}
            <div className="absolute right-5 -top-2 mt-10 w-32 bg-white border shadow-lg hidden group-hover:block">
              <div>
                <button
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center justify-evenly gap-2"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin">&#8987;</span>
                  ) : (
                    <MdLogout size={16} />
                  )}
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
