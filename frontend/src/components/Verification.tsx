import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import { useState } from "react";
import {
  setEmailVerified,
  setError,
  setPhoneVerified,
} from "../redux/slices/userSlice";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Verification = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [phoneVerify, setPhoneVerify] = useState(false);
  const userData = useSelector((state: any) => state.user.userData);

  const handlePhoneVerification = async () => {
    try {
      const phone = userData.phone;
      const phoneNumber = "+" + phone.toString();
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/auth/verify-phone`,
        { phone: phoneNumber, otp: phoneOTP }
      );
      if (response.data.success) {
        dispatch(setPhoneVerified(true));
        setPhoneVerify(true);
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage = error.response?.data?.message || "Phone verification failed";

      // Show toast with the error message
      toast({
        variant: "destructive",
        description: errorMessage,
      });

      // Dispatch the error to Redux store
      dispatch(setError(errorMessage));
    }
  };

  const handleEmailVerification = async () => {
    try {
      const email = userData.email;
      // console.log("email - ", email);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/auth/verify-email`,
        { email, otp: emailOTP }
      );
      if (response.data.success) {
        dispatch(setEmailVerified(true));
        setEmailVerify(true);
      }
    } catch (error) {
      //@ts-ignore
      const errorMessage =error.response?.data?.message || "Email verification failed";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
      dispatch(setError(errorMessage));
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-2">Sign Up</h2>
      <p className="text-center text-sm mb-4">
        Lorem Ipsum is simply dummy text
      </p>
      <div className="relative">
        <Input
          icon={<MdOutlineEmail className="text-gray-500" size={24} />}
          type="text"
          placeholder="Email OTP"
          value={emailOTP}
          onChange={(e) => setEmailOTP(e.target.value)}
        />
        {!emailVerify ? (
          <button
            className="w-full py-1 border-2 bg-[#0B66EF] hover:bg-blue-700 text-white transition-colors"
            onClick={handleEmailVerification}
          >
            Verify Email
          </button>
        ) : (
          <div className="absolute top-3 right-5">
            <FaCheck className="text-green-500" />
          </div>
        )}
      </div>
      <div className="relative mt-4">
        <Input
          icon={<FiPhone className="text-gray-500" size={24} />}
          type="text"
          placeholder="Phone OTP"
          value={phoneOTP}
          onChange={(e) => setPhoneOTP(e.target.value)}
        />
        {!phoneVerify ? (
          <button
            className="w-full py-1 border-2 bg-[#0B66EF] hover:bg-blue-700 text-white transition-colors"
            onClick={handlePhoneVerification}
          >
            Verify Phone
          </button>
        ) : (
          <div className="absolute top-3 right-5">
            <FaCheck className="text-green-500" />
          </div>
        )}
      </div>
      <button
        className="w-full bg-[#0B66EF] text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        onClick={() => {
          if (emailVerify && phoneVerify) {
            router("/home");
          }
        }}
        disabled={!emailVerify || !phoneVerify}
      >
        Proceed
      </button>
    </div>
  );
};
