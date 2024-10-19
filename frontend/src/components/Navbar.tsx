import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/cuvette_logo.png";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div className="flex justify-between items-center p-4 mx-16">
      <img src={Logo} alt="Cuvette Logo" className="w-32" />
      <div className="text-[#576474] flex items-center font-semibold">
        Contact
        {userData && (
          <div className="relative group ml-5 flex items-center">
            {/* Profile Info */}
            <div className="border-2 px-2 py-1 flex items-center gap-3">
              {userData.name}
              <CgProfile size={20} />
            </div>

            {/* Logout Button */}
            <div className="absolute right-5 -top-2 mt-10 bg-white border shadow-lg hidden group-hover:block">
              <div>
                <button
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <MdLogout size={16} />
                  Logout
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
