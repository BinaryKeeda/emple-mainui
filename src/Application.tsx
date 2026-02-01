// import React, { Suspense, lazy } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Callback from "./auth/Callback";
import Verify from "./auth/Verify";
import CounsellingHome from "./pages/CounsellingHome";
import { RoleBasedRoutes } from "./auth/ProtectedRoutes";
import { useUser } from "./context/UserContext";
import Dashboard from "./view/user/Dashboard";
import Signup from "./auth/Signup";
import { ADMIN_URL } from "./lib/config";
import AuthGuard from "./auth/AuthGuard";
import Loader from "./shared/ui/Loader";
// import { ADMIN_URL, GOOGLE_CLIENT_ID } from "./lib/config";
// import { HelmetProvider } from "react-helmet-async";
// import ThemeProvider from "./context/ThemeProvider";
// import { SnackbarProvider } from "notistack";
// import Loader from "./layout/Loader";
// import { Slide } from "@mui/material";
// import { RoleBasedRoutes, UserRoute } from "./auth/ProtectedRoutes";

// const ExternalRedirect = ({ url }: {
//   url: string
// }) => {
//   window.location.href = ADMIN_URL;
// }
//
// const dispatch = useDispatch();
// const token = Cookies.get("token");
// const { user } = useSelector((state) => state.auth);

//   );

//   // admin routes

// <>
//     {/* <App /> */}
//     {/* <Routes> */}
//     {/* ============================================================= */}
//     {/*                        Public Routes Starts                   */}
//     {/* ============================================================= */}

//     {/* <Route path="/" element={<> sds</>} /> */}
//     {/* <Route path="/" element={<>home</>} /> */}
//     {/* <Route path="/profile/:id" element={<UserProfile />} /> */}
//     {/* <Route path="/counselling" element={<CounsellingHome />} /> */}
//     {/* <Route element={<UserRoute />}>
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/signin" element={<Redirect />} />
//     <Route path="/verify/:id" element={<SetUpPassword />} />
//     <Route path="/reset" element={<ForgerPassword />} />
//   </Route>

//   <Route path="/privacy-policy" element={<Policy />} />
//   <Route path="/about" element={<About />} />
//   <Route path="/contact" element={<Contact />} />
//   <Route path="/terms-of-service" element={<Terms />} /> */}
//     {/*  User But Public  */}
//     {/* ============================================================= */}
//     {/*                        Public Routes Starts                   */}
//     {/* ============================================================= */}
//     {/* ============================================================= */}
//     {/*                        User Public Routes Starts              */}
//     {/* ============================================================= */}
//     {/* <Route path="/" element={<UserLayout />}>
//     <Route
//       path="user/practice"
//       element={<UserPracticeArea />}
//     />
//     <Route
//       path="user/binarykeeda-dsa-sheet"
//       element={<UserCoding />}
//     />
//     <Route path="user/resume" element={<ResumeATS />} />
//     <Route
//       path="user/resources"
//       element={<UserResources />}
//     ></Route>
//     <Route
//       path="user/binarykeeda-dsa-sheet/description/:topicName/:problemTitle"
//       element={<UserCodingDescription />}
//     />
//     <Route
//       path="/user/binarykeeda-210-sheet"
//       element={<UserRoadMapSheet />}
//     />
//     <Route
//       path="user/problems"
//       element={<UserCodingProblems />}
//     />
//     <Route
//       path="user/binarykeeda-roadmap-sheet"
//       element={<UserRoadmaps />}
//     />
//     <Route
//       path="user/binarykeeda-roadmap-sheet/blog/:slug"
//       element={<UserBlog />}
//     />
//     <Route
//       path="user/practice/:name"
//       element={<UserQuizList />}
//     />
//   </Route> */}
//     {/* ============================================================= */}
//     {/*                        User Public Routes Ends                */}
//     {/* ============================================================= */}
//     {/* <Route path="/user/exam/:id" element={<ExamAttempt />} /> */}
//     {/* ============================================================= */}
//     {/*                        User  Routes Starts                    */}
//     {/* ============================================================= */}
//     {/* <Route
//     path="/user"
//     element={
//       <RoleBasedRoutes requiredRole={"user"}>
//         {" "}
//         <UserLayout />{" "}
//       </RoleBasedRoutes>
//     }
//   >
//     <Route index element={<UserDashboard />} />
//     <Route path="coins-add" element={<CoinsAdd />} />
//     <Route path="coins-add/:id" element={<CoinsCheckout />} />
//     <Route path="group/:id" element={<UserAssociatedGroup />} />
//     <Route path="roadmaps" element={<UserRoadmaps />} />
//     <Route path="profile" element={<UserProfile />} />
//     <Route
//       path="solutions/list/:slug"
//       element={<UserSolutionsList />}
//     />
//     <Route element={<UserTestOptions />} path="test-series/" />
//     <Route element={<UserTestList />} path="test-series/:id" />
//     <Route element={<UserPreview />} path="preview/:id" />
//     <Route
//       element={<UserTestPreview />}
//       path="test/preview/:id"
//     />
//   </Route>
//   <Route element={<RoleBasedRoutes requiredRole={"user"} />}>
//     <Route element={<UserSolution />} path="user/quiz/:slug" />
//     <Route
//       element={<UserTestAttempt />}
//       path="user/test/:slug"
//     />
//   </Route> */}
//     {/* <Route
//     path="user/problem/:slug"
//     element={<UserCodingProblemsAttempt />}
//   /> */}
//     {/* ============================================================= */}
//     {/*                        User  Routes Ends                     */}
//     {/* ============================================================= */}
//     {/* ============================================================= */}
//     {/*                        Admin Routes Starts                    */}
//     {/* ============================================================= */}

//     {/* <Route
//     path="/admin"
//     element={
//       <RoleBasedRoutes requiredRole={"admin"}>
//         <AdminLayout />
//       </RoleBasedRoutes>
//     }
//   >
//     <Route index element={<AdminHome />} />
//     <Route path="view/:id" element={<ViewQuiz />} />
//     <Route path="test-series" element={<AdminTestSeries />} />
//     <Route path="add/problem" element={<AdminAddProblem />} />
//     <Route path="test" element={<AdminTestListing />} />
//     <Route path="edit/test/:id" element={<AdminEditTest />} />
//     <Route
//       path="campustest"
//       element={<AdmintCampusTestListing />}
//     />
//     <Route
//       path="edit/campustest/:id"
//       element={<AdminEditCampusTest />}
//     />
//     <Route path="problems" element={<AdminProblemsListing />} />
//     <Route
//       path="edit/problems/:id"
//       element={<AdminEditProblem />}
//     />
//     <Route path="users" element={<></>} />
//     <Route path="quiz" element={<AdminQuizListing />} />
//     <Route path="edit/quiz/:id" element={<AdminEditQuiz />} />
//     <Route
//       path="questionbank"
//       element={<AdminQuestionBankListing />}
//     />
//     <Route
//       path="edit/questionbanks/:id"
//       element={<AdminEditQuestionBank />}
//     />
//     <Route path="mail/:testId" element={<AdminMailTest />} />
//     <Route path="groups" element={<AdminGroupsManage />} />
//     <Route path="sections" element={<></>} />
//   </Route> */}
//     {/* ============================================================= */}
//     {/*                        Admin Routes Ends                    */}
//     {/* ============================================================= */}
//     {/* <Route
//     path="/campus-admin"
//   /> */}
//     {/* <Route
//     path="/campus-superadmin"
//   /> */}

//     {/* <Route path="*" element={<NotFound />} /> */}
//     {/* </Routes> */}
// </>

export default function App() {
  const ExternalRedirect = ({ redirect }: { redirect: string }) => {
    return (window.location.href = ADMIN_URL);
  };
  const Home = lazy(() => import("./pages/Home"));
  const NotFound = lazy(() => import("./utilities/NotFound"));
  const Terms = lazy(() => import("./pages/Terms"));
  const Policy = lazy(() => import("./pages/PrivacyPolicy"));
  const AuthLayout = lazy(() => import("./auth/AuthLayout"));
  const Login = lazy(() => import("./auth/Login"));
  const Reset = lazy(() => import("./auth/ResetPage"));
  const Register = lazy(() => import("./pages/Register"));
  const Redirect = lazy(() => import("./utilities/Redirect"));
  const About = lazy(() => import("./view/user/About"));
  const Contact = lazy(() => import("./view/user/Contact"));
  const ResumeATS = lazy(() => import("./pages/Resume"));
  const SetUpPassword = lazy(() => import("./pages/SetUpPassword"));
  const ForgerPassword = lazy(() => import("./pages/ResetPassword"));
  const ExamAttempt = lazy(() => import("./view/test/Home"));

  /// User routes
  const UserRoadMapSheet = lazy(() => import("./view/user/RoadMapSheet"));
  const UserLayout = lazy(() => import("./view/user/Userdashboard"));
  const UserDashboard = lazy(() => import("./view/user/Dashboard"));
  const UserAssociatedGroup = lazy(() => import("./view/user/AssociatedGroup"));
  const UserPractice = lazy(() => import("./view/user/QuizOptions"));
  const UserResources = lazy(() => import("./view/user/ResourcesArea"));
  const UserCoding = lazy(() => import("./view/user/DsaSheet"));
  const UserCodingDescription = lazy(
    () => import("./view/user/components/ProblemsetDescription"),
  );
  const UserBlog = lazy(() => import("./view/user/Blog"));
  const UserRoadmaps = lazy(() => import("./view/user/Roadmap"));
  const UserSolution = lazy(() => import("./view/user/QuizAttempt"));
  const UserProfile = lazy(() => import("./view/user/Profile"));
  const UserPreview = lazy(() => import("./view/user/QuizPreview"));
  const UserPracticeArea = lazy(() => import("./view/user/PracticeArea"));
  const UserTestPreview = lazy(() => import("./view/user/TestPreview"));
  const UserCodingProblems = lazy(() => import("./view/user/ProblemList"));
  const UserCodingProblemsAttempt = lazy(
    () => import("./view/user/ProblemAttempt"),
  );
  const UserTestList = lazy(() => import("./view/user/TestList"));
  const UserTestAttempt = lazy(() => import("./view/user/TestAttemptPage"));
  const UserTestOptions = lazy(() => import("./view/user/TestOptions"));
  const UserQuizList = lazy(() => import("./view/user/QuizList"));
  const UserSolutionsList = lazy(() => import("./view/user/UserSolutionList"));

  const CoinsAdd = lazy(() => import("./view/user/CoinsAdd"));
  const CoinsCheckout = lazy(() => import("./view/user/CoinCheckout"));

  const AdminLayout = lazy(
    () => import("./view/admin/pages/Admindashboard"),
  );
  const Users = lazy(() => import("./view/admin/pages/Users"));
  const EditQuiz = lazy(() => import("./view/admin/pages/EditQuiz"));

  const ViewQuiz = lazy(() => import("./view/admin/pages/Quiz"));
  const AdminHome = lazy(() => import("./view/admin/pages/Home"));
  const AdminTestSeries = lazy(() => import("./view/admin/pages/Test"));
  const AdminTestEdit = lazy(() => import("./view/admin/pages/TestEdit"));
  const AdminGroupsManage = lazy(
    () => import("./view/admin/pages/AddAdminGroup"),
  );
  const AdminAddProblem = lazy(
    () => import("./view/admin/components/AddProblem"),
  );
  const CounsellingHome = lazy(() => import("./pages/CounsellingHome"));

  const AdminQuizListing = lazy(
    () => import("./view/admin/pages/AdminQuizzes"),
  );
  const AdminTestListing = lazy(() => import("./view/admin/pages/AdminTests"));
  const AdmintCampusTestListing = lazy(
    () => import("./view/admin/pages/AdminCampusTest"),
  );
  const AdminProblemsListing = lazy(
    () => import("./view/admin/pages/AdminProblems"),
  );
  const AdminQuestionBankListing = lazy(
    () => import("./view/admin/pages/AdminQuestionBank"),
  );
  const AdminEditTest = lazy(() => import("./view/admin/pages/AdminEditTest"));
  const AdminEditQuiz = lazy(() => import("./view/admin/pages/AdminEditQuiz"));
  const AdminEditCampusTest = lazy(
    () => import("./view/admin/pages/AdminEditCampusTest"),
  );
  const AdminEditProblem = lazy(
    () => import("./view/admin/pages/AdminEditProblem"),
  );
  const AdminEditQuestionBank = lazy(
    () => import("./view/admin/pages/AdminEditQuestionBank"),
  );
  const AdminMailTest = lazy(() => import("./view/admin/pages/AdminMailTest"));
  const { isFetchingUser } = useUser();
  if (isFetchingUser) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            {/* <App /> */}
            {/* <Routes> */}
            {/* ============================================================= */}
            {/*                        Public Routes Starts                   */}
            {/* ============================================================= */}
            <Route path="/" element={<Home />} />
            <Route path="/" element={<AuthLayout />}>
              <Route path="/auth/callback" element={<Callback />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/verify" element={<Verify />} />
            </Route>
            {/* <Route path="/profile/:id" element={<UserProfile />} /> */}
            <Route path="/counselling" element={<CounsellingHome />} />
            {/* <Route element={<UserRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/signin" element={<Redirect />} />
                        <Route path="/verify/:id" element={<SetUpPassword />} />
                        <Route path="/reset" element={<ForgerPassword />} />
                    </Route> */}

            <Route path="/privacy-policy" element={<Policy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms-of-service" element={<Terms />} />
            {/*  User But Public  */}
            {/* ============================================================= */}
            {/*                        Public Routes Starts                   */}
            {/* ============================================================= */}
            {/* ============================================================= */}
            {/*                        User Public Routes Starts              */}
            {/* ============================================================= */}
            <Route path="/" element={<UserLayout />}>
              <Route path="user/practice" element={<UserPracticeArea />} />
              <Route
                path="user/binarykeeda-dsa-sheet"
                element={<UserCoding />}
              />
              <Route path="user/resume" element={<ResumeATS />} />
              <Route path="user/resources" element={<UserResources />}></Route>
              <Route
                path="user/binarykeeda-dsa-sheet/description/:topicName/:problemTitle"
                element={<UserCodingDescription />}
              />
              <Route
                path="/user/binarykeeda-210-sheet"
                element={<UserRoadMapSheet />}
              />
              <Route path="user/problems" element={<UserCodingProblems />} />
              <Route
                path="user/binarykeeda-roadmap-sheet"
                element={<UserRoadmaps />}
              />
              <Route
                path="user/binarykeeda-roadmap-sheet/blog/:slug"
                element={<UserBlog />}
              />
              <Route path="user/practice/:name" element={<UserQuizList />} />
            </Route>
            {/* ============================================================= */}
            {/*                        User Public Routes Ends                */}
            {/* ============================================================= */}
            <Route path="/user/exam/:id" element={<ExamAttempt />} />
            {/* ============================================================= */}
            {/*                        User  Routes Starts                    */}
            {/* ============================================================= */}
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="coins-add" element={<CoinsAdd />} />
              <Route path="coins-add/:id" element={<CoinsCheckout />} />
              <Route path="group/:id" element={<UserAssociatedGroup />} />
              <Route path="roadmaps" element={<UserRoadmaps />} />
              <Route path="profile" element={<UserProfile />} />
              <Route
                path="solutions/list/:slug"
                element={<UserSolutionsList />}
              />
              <Route element={<UserTestOptions />} path="test-series/" />
              <Route element={<UserTestList />} path="test-series/:id" />
              <Route element={<UserPreview />} path="preview/:id" />
              <Route element={<UserTestPreview />} path="test/preview/:id" />
            </Route>
            <Route element={<RoleBasedRoutes requiredRole={"user"} />}>
              <Route element={<UserSolution />} path="user/quiz/:slug" />
              <Route element={<UserTestAttempt />} path="user/test/:slug" />
            </Route>
            {/* <Route
            path="user/problem/:slug"
            element={<UserCodingProblemsAttempt />}
          /> */}
            {/* ============================================================= */}
            {/*                        User  Routes Ends                     */}
            {/* ============================================================= */}
            {/* ============================================================= */}
            {/*                        Admin Routes Starts                    */}
            {/* ============================================================= */}

            <Route
              path="/admin"
              element={
                <RoleBasedRoutes requiredRole={"admin"}>
                  <AdminLayout />
                </RoleBasedRoutes>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="view/:id" element={<ViewQuiz />} />
              <Route path="test-series" element={<AdminTestSeries />} />
              <Route path="add/problem" element={<AdminAddProblem />} />
              <Route path="test" element={<AdminTestListing />} />
              <Route path="edit/test/:id" element={<AdminEditTest />} />
              <Route path="campustest" element={<AdmintCampusTestListing />} />
              <Route
                path="edit/campustest/:id"
                element={<AdminEditCampusTest />}
              />
              <Route path="problems" element={<AdminProblemsListing />} />
              <Route path="edit/problems/:id" element={<AdminEditProblem />} />
              <Route path="users" element={<></>} />
              <Route path="quiz" element={<AdminQuizListing />} />
              <Route path="edit/quiz/:id" element={<AdminEditQuiz />} />
              <Route
                path="questionbank"
                element={<AdminQuestionBankListing />}
              />
              <Route
                path="edit/questionbanks/:id"
                element={<AdminEditQuestionBank />}
              />
              <Route path="mail/:testId" element={<AdminMailTest />} />
              <Route path="groups" element={<AdminGroupsManage />} />
              <Route path="sections" element={<></>} />
            </Route>
            {/* ============================================================= */}
            {/*                        Admin Routes Ends                    */}
            {/* ============================================================= */}
            <Route
              path="/campus-admin"
              element={<ExternalRedirect redirect="/campus-admin" />}
            />
            <Route
              element={<ExternalRedirect redirect="/campus-superadmin" />}
              path="/campus-superadmin"
            />

            <Route path="*" element={<NotFound />} />
          </Route>
          {/* </Routes> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
