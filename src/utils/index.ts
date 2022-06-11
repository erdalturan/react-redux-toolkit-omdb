import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../features";
import jwt_decode from "jwt-decode";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
});

axiosPrivate.interceptors.request.use(
  async (config: any) => {
    const user = store?.getState()?.userData?.user;

    let currentDate = new Date();
    if (user?.accessToken) {
      const decodedToken: { exp: number } = jwt_decode(user?.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${
            store?.getState()?.userData?.user?.accessToken
          }`;
        }
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
