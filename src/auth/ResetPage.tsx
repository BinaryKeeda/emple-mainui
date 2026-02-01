'use client';

import { useSearchParams } from "react-router-dom";
import SetupPasswordForm from "./ResetPass";
import ResetPasswordForm from "./SetPass";

export default function Page() {
  const searchParams = useSearchParams()[0];
  const token = searchParams.get('t');
  return token ? <SetupPasswordForm/> : <ResetPasswordForm/>;
}
