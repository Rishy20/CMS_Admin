import React from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

//Component to check if the user has logged in
const checkLogin = () => {
    return () => {
        const isAuth = !!Cookies.get("adminToken");

        if (isAuth) {
            let decoded = jwt_decode(Cookies.get("adminToken"));
            return decoded.userType;
        } else {
            return false;
        }
    };
};

export default checkLogin;