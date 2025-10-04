import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { BASE_URL } from "./config";
import { logoutUser } from "../redux/slice/UserSlice";

export const handleLogout = () => {
    try {
        const dispacth = useDispatch();
        dispacth(logoutUser);
    } catch (error) {
        console.log(error, "logout");
    }
};