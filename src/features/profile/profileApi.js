import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const authorizationConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getProfile = async (token) => {
  const { data } = await axios.get(`${apiUrl}/auth/profile`, authorizationConfig(token));
  return data.user;
};

export const updateProfile = async (token, profile) => {
  const { data } = await axios.put(
    `${apiUrl}/auth/profile`,
    profile,
    authorizationConfig(token)
  );
  return data.user;
};
