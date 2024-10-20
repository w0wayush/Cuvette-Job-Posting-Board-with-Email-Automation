import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import { setUser, setError } from "../redux/slices/userSlice";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

export const Signin = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);
  //   console.log(userData);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/auth/login`,
        formData
      );
      const { token, user } = response.data;
      if (token && user) {
        localStorage.setItem("authToken", token);
        await dispatch(setUser({ ...user, token }));
        navigate("/home");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Signin error:", error);
      const errorMessage = error.response?.data?.message || "Signin failed";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
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
            <>
              <h2 className="text-2xl text-center font-bold mb-2">Sign In</h2>
              <p className="text-center text-sm mb-4">
                Lorem Ipsum is simply dummy text
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
                <Input
                  icon={<MdOutlineEmail className="text-gray-500" size={24} />}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
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

                <p className="text-sm mb-4 text-center mx-4 md:mx-20 ">
                  By clicking on proceed you will accept our{" "}
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    Terms
                  </span>{" "}
                  &{" "}
                  <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    Conditions
                  </span>
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#0B66EF] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Proceed
                </button>

                <p className="text-right text-sm">
                  New user{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Create Account
                  </span>
                  ...
                </p>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
