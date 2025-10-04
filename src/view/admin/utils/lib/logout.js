import { signOut } from "firebase/auth";
import { loginFailed, logoutUser, setLoading } from "../../../redux/reducers/userSlice";
import store from "../../../redux/store";
import { auth } from "../../../firebase";
import axios from "axios";
import { BASE_URL } from "../../../config";

export const customSignOut = async ({ redirect = "/" }) => {
    try {
        store.dispatch(setLoading(true));

        // Firebase sign-out
        await signOut(auth);

        // Replace history state
        window.history.replaceState(null, '', '/');

        // API logout request
        await axios.post(BASE_URL + "/api/v1/auth/logout", {}, { withCredentials: true });

        // Redux logout
        store.dispatch(logoutUser());

        // Redirect or reload
        window.location.href = redirect;
        
    } catch (e) {
        console.error("Logout Error:", e);
        store.dispatch(loginFailed(e.message));
    } finally {
        store.dispatch(setLoading(false));
    }
};
