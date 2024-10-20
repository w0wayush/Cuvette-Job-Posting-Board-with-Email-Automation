import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  companyName?: string;
  email?: string;
  employeeSize?: number;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  jobPostings?: string;
  name?: string;
  phone?: number;
  token: string;
  _id: string;
}

interface UserState {
  userData: UserData | null;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  isPhoneVerified: false,
  isEmailVerified: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      if (action.payload) {
        state.isPhoneVerified = action.payload.isPhoneVerified;
        state.isEmailVerified = action.payload.isEmailVerified;
      } else {
        state.isPhoneVerified = false;
        state.isEmailVerified = false;
      }
    },
    setPhoneVerified: (state, action: PayloadAction<boolean>) => {
      state.isPhoneVerified = action.payload;
      if (state.userData) {
        state.userData.isPhoneVerified = action.payload;
      }
    },
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
      if (state.userData) {
        state.userData.isEmailVerified = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { setUser, setPhoneVerified, setEmailVerified, setError, logout } =
  userSlice.actions;

export default userSlice.reducer;
