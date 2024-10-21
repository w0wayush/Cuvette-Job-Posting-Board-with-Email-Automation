import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import "./App.css";
import { Homepage } from "./components/Homepage";
import { Signup } from "./components/Signup";
import Navbar from "./components/Navbar";
import { Signin } from "./components/Signin";
import { setUser } from "./redux/slices/userSlice";
import { toast } from "./hooks/use-toast";
import JobPostingForm from "./components/JobPostingForm";

const persistor = persistStore(store);

const App = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const userData = useSelector((state: any) => state.user.userData);
  const isEmailVerified = useSelector(
    (state: any) => state.user.isEmailVerified
  );
  const isPhoneVerified = useSelector(
    (state: any) => state.user.isPhoneVerified
  );
  const isVerified = isEmailVerified && isPhoneVerified;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // console.log("Token from localStorage:", token);
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Auth response data:", response.data.data);
          if (response.data) {
            dispatch(setUser(response.data.data));
          }
        } else {
          toast({
            variant: "destructive",
            description: "No token found in localStorage",
          });
        }
      } catch (error) {
        console.log("Error fetching auth status", error);
        //@ts-ignore
        dispatch(setUser({ data: null }));
        localStorage.removeItem("authToken");
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  // console.log("userData:", userData);
  // console.log("isEmailVerified:", isEmailVerified);
  // console.log("isPhoneVerified:", isPhoneVerified);
  // console.log("isVerified:", isVerified);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="mx-auto">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isVerified ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/home"
            element={isVerified ? <Homepage /> : <Navigate to="/" />}
          />
          <Route
            path="/job"
            element={isVerified ? <JobPostingForm /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={isVerified ? <Homepage /> : <Signin />}
          />
          <Route
            path="/signup"
            element={isVerified ? <Homepage /> : <Signup />}
          />
          <Route
            path="*"
            element={<Navigate to={isVerified ? "/home" : "/"} />}
          />
        </Routes>
      </div>
    </PersistGate>
  );
};

export default App;
