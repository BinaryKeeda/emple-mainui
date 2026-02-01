import { BASE_URL } from "./config";

export const WASSUP_URL =
  "https://api.whatsup.com/send?phone=919557639280&text=I%20want%20to%20know%20about%20the%20courses.";

export const RAZORPAY_URL = "https://api.razorpay.com/v1/checkout/embedded";

const createUrl = (path:string) => `${BASE_URL}/api/v1/${path}`;

// Auth
export const LOGIN_URL = createUrl("auth/login");
export const VERIFY_OTP_URL = createUrl("auth/verify-otp");
export const REGISTER_URL = createUrl("auth/register-user");

// User
export const USER_URL = createUrl("auth/get-user");
export const USER_LOGOUT_URL = createUrl("auth/logout");
export const GOOGLE_LOGIN_URL = createUrl("auth/google-login");
export const LINKEDIN_LOGIN_URL = createUrl("auth/linkedin-login");
export const GITHUB_LOGIN_URL = createUrl("auth/github-login");
export const COMPLETE_PROFILE_URL = createUrl("auth/complete-profile");
export const RESUME_UPLOAD_URL = createUrl("user/upload-resume");

// Test
export const CREATE_TEST_URL = createUrl("tests/create-test");
export const GET_ALL_TESTS_URL = createUrl("tests/get-all-tests");
export const GET_TEST_URL = createUrl("tests/get-test");
export const START_TEST_URL = createUrl("tests/start-test");
export const SUBMIT_TEST_URL = createUrl("tests/submit-test");

// Other
export const GET_LEADERBOARD_URL = createUrl("leaderboard");
export const GET_ALL_GROUPS_URL = createUrl("get-all-groups");
export const GET_GROUP_URL = createUrl("get-group");

// Questions
export const ADD_QUESTION_URL = createUrl("questions/add-question");
export const GET_ALL_QUESTIONS_URL = createUrl("questions/get-all-questions");
export const GET_QUESTION_URL = createUrl("questions/get-question");

// Submissions
export const CREATE_SUBMISSION_URL = createUrl("submissions/create-submission");
export const GET_SUBMISSION_URL = createUrl("submissions/get-submission");

// Jobs
export const GET_ALL_JOBS_URL = createUrl("jobs/get-all-jobs");
export const GET_JOB_URL = createUrl("jobs/get-job");

// Payments
export const CREATE_ORDER_URL = createUrl("payments/create-order");

