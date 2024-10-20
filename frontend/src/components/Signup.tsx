import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import { setUser, setError } from "../redux/slices/userSlice";
import axios from "axios";
import { FiPhone, FiUser } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "../hooks/use-toast";
import { Verification } from "./Verification";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  employeeSize: string | number;
  phone: string;
}

export const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);
  //   console.log(userData);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    employeeSize: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure phone is a valid number and concatenate +91
      const phoneNumber = `+91${formData.phone.toString()}`;

      // Prepare user data object with the prefixed phone number
      const userData = { ...formData, phone: phoneNumber };

      // Make the POST request to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/auth/signup`,
        userData
      );

      // console.log(response);

      // Extract the auth token (assuming it's in response.data.token)
      const authToken = response.data.token; // Adjust if token is stored differently
      // console.log(`Auth token: ${authToken}`);
      if (authToken) {
        // Store the token in localStorage
        localStorage.setItem("authToken", authToken);

        // Dispatch user data (assuming user data is in response.data.user)
        dispatch(setUser(response.data.user));

        // Show verification form or message
        setShowVerification(true);
      } else {
        throw new Error("Token not found in response");
      }

      //   console.log(response.data);
    } catch (error) {
      // Handle the error and display an appropriate message
      const errorMessage = error.response?.data?.message || "Signup failed";

      // Show toast with the error message
      toast({
        variant: "destructive",
        description: errorMessage,
      });

      // Dispatch the error to the Redux store
      dispatch(setError(errorMessage));
    }
  };

  return (
    <div className="min-h-[calc(100vh-50px)] grid lg:grid-cols-2 grid-cols-1 bg-white">
      {/* Left side description */}
      <div className="hidden lg:flex items-center justify-center p-4 md:p-8">
        <div className="max-w-lg text-lg leading-relaxed text-left">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </div>
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg">
          <div className="shadow-xl p-4 md:p-8 rounded-xl border-2 bg-white">
            {!showVerification ? (
              <>
                <h2 className="text-2xl text-center font-bold mb-2">Sign Up</h2>
                <p className="text-center text-sm mb-4">
                  Lorem Ipsum is simply dummy text
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-4"
                >
                  <Input
                    icon={<FiUser className="text-gray-500" size={20} />}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    icon={<FiPhone className="text-gray-500" size={24} />}
                    type="tel"
                    placeholder="Phone no."
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    icon={<FiUser className="text-gray-500" size={20} />}
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  <Input
                    icon={
                      <MdOutlineEmail className="text-gray-500" size={24} />
                    }
                    type="email"
                    placeholder="Company Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Input
                    icon={<PiUsersThree className="text-gray-500" size={24} />}
                    type="number"
                    placeholder="Employee Size"
                    name="employeeSize"
                    value={formData.employeeSize}
                    onChange={handleChange}
                  />
                  <Input
                    icon={
                      <RiLockPasswordLine className="text-gray-500" size={24} />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Input
                    icon={
                      <RiLockPasswordLine className="text-gray-500" size={24} />
                    }
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <p className="text-sm mb-4 text-center mx-4 md:mx-20">
                    By clicking on proceed you will accept our{" "}
                    <span className="text-blue-500">Terms</span> &{" "}
                    <span className="text-blue-500">Conditions</span>
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-[#0B66EF] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Proceed
                  </button>
                  <p className="text-right text-sm">
                    Already have an account{" "}
                    <span
                      onClick={() => navigate("/signin")}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Login here
                    </span>
                    ...
                  </p>
                </form>
              </>
            ) : (
              <Verification />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
