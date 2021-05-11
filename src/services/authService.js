import axios from "axios";
import authHeader from "../utils/auth-header";
import config from "../utils/config";

export const getCurrentUser = () => {
  const USER_CREDENTIALS = JSON.parse(localStorage.getItem("USER_CREDENTIALS"));

  if (USER_CREDENTIALS) {
    return USER_CREDENTIALS;
  }

  return null;
};

export const validateToken = async () => {
  const USER_CREDENTIALS = JSON.parse(localStorage.getItem("USER_CREDENTIALS"));

  if (!USER_CREDENTIALS) {
    return { success: false, user: {} };
  }

  const KEYS = config();
  const API_URL = KEYS.API_URL + "/api/user/authenticated";
  const { token } = USER_CREDENTIALS;

  //Authenticate token
  try {
    const res = await axios.get(API_URL, { headers: authHeader(token) });
    const user = res.data.response;
    return { success: true, user: { ...user, token } };
  } catch (e) {
    return { success: false, user: {} };
  }
};
