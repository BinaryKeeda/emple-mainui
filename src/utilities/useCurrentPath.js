// utils/useCurrentPath.js
import { useLocation } from "react-router-dom";

export function useCurrentPath() {
  const location = useLocation();
  return location.pathname; // returns "/dashboard" or "/about"
}
