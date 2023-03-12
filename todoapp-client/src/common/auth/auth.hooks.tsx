import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "./auth.context";
import axios, { axiosPrivate } from "../../lib/axios";
import { IDecodedToken, IToken } from "./auth.types";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useRefreshToken = () => {
    const authCtx = useAuth();

    const refresh = async () => {
        const resp = await axios.get("/users/access-token", {
            withCredentials: true
        });

        const decodedToken: IDecodedToken = jwt_decode(resp.data.token);

        const token: IToken = {
            plaintext: resp.data.token,
            iat: decodedToken.iat,
            exp: decodedToken.exp
        };

        authCtx?.setToken(token);

        return token.plaintext;
    };

    return refresh;
};

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const authCtx = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const reqIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${authCtx?.token?.plaintext}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const respIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousReq = error?.config;
                if (error?.response?.status === 403 && !previousReq?.sent) {
                    previousReq.sent = true;
                    const newAccessToken = await refresh();
                    previousReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(previousReq);
                }
                navigate("/login", { state: { from: location }, replace: true });
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept);
            axiosPrivate.interceptors.response.eject(respIntercept);
        };
    }, [authCtx?.token, refresh]);

    return axiosPrivate;
};
