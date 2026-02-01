import { useDescope } from "@descope/react-sdk"

export const UseLogout = () => {
    const { logout } = useDescope();
    const logoutUser = async () => { await logout(); localStorage.clear(); sessionStorage.clear() }
    return { logoutUser }
}