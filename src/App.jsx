import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ADMIN_URL, BASE_URL, GOOGLE_CLIENT_ID } from './lib/config'
import { getUser } from './redux/reducers/UserThunks'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { RoleBasedRoutes, UserRoute } from './auth/ProtectedRoutes'
import { getRank } from './redux/api/getRank'
import { HelmetProvider } from 'react-helmet-async'
import ThemeProvider from './context/ThemeProvider'
import { SnackbarProvider } from 'notistack'
import Loader from './layout/Loader'
import { LoginModalProvider } from './context/LoginModalContext'
import { Slide } from '@mui/material'


const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null; // nothing to render
};


const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Redirect = lazy(() => import('./utilities/Redirect'))
const About = React.lazy(() => import('./view/user/About'))
const Contact = React.lazy(() => import('./view/user/Contact'))
const ResumeATS = React.lazy(() => import('./pages/Resume'))
const SetUpPassword = lazy(() => import('./pages/SetUpPassword'))
const ForgerPassword = lazy(() => import('./pages/ResetPassword'))
const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./utilities/NotFound'))
const Terms = lazy(() => import('./pages/Terms'))
const Policy = lazy(() => import('./pages/PrivacyPolicy'))
const ExamAttempt = lazy(() => import('./view/test/Home'))
const CLIENT_ID = GOOGLE_CLIENT_ID
const App = () => {
  const dispatch = useDispatch()
  const token = Cookies.get('token')
  const { user } = useSelector(state => state.auth)

  /// User routes
  const UserRoadMapSheet = React.lazy(() => import('./view/user/RoadMapSheet'))
  const UserLayout = React.lazy(() => import('./view/user/Userdashboard'))
  const UserDashboard = React.lazy(() => import('./view/user/Dashboard'))
  const UserAssociatedGroup = React.lazy(() =>
    import('./view/user/AssociatedGroup')
  )
  const UserPractice = React.lazy(() => import('./view/user/QuizOptions'))
  const UserResources = React.lazy(() => import('./view/user/ResourcesArea'))
  const UserCoding = React.lazy(() => import('./view/user/DsaSheet'))
  const UserCodingDescription = React.lazy(() =>
    import('./view/user/components/ProblemsetDescription')
  )
  const UserBlog = React.lazy(() => import('./view/user/Blog'))

  const UserRoadmaps = React.lazy(() => import('./view/user/Roadmap'))
  const UserSolution = React.lazy(() => import('./view/user/QuizAttempt'))
  const UserProfile = React.lazy(() => import('./view/user/Profile'))
  const UserPreview = React.lazy(() => import('./view/user/QuizPreview'))
  const UserPracticeArea = React.lazy(() => import('./view/user/PracticeArea'))
  const UserTestPreview = React.lazy(() => import('./view/user/TestPreview'))
  const UserCodingProblems = React.lazy(() => import('./view/user/ProblemList'))
  const UserCodingProblemsAttempt = React.lazy(() =>
    import('./view/user/ProblemAttempt')
  )

  const UserTestList = React.lazy(() => import('./view/user/TestList'))
  const UserTestAttempt = React.lazy(() =>
    import('./view/user/TestAttemptPage')
  )
  const UserTestOptions = React.lazy(() => import('./view/user/TestOptions'))
  const UserQuizList = React.lazy(() => import('./view/user/QuizList'))
  const UserSolutionsList = React.lazy(() =>
    import('./view/user/UserSolutionList')
  )
  // admin routes
  const AdminLayout = React.lazy(() =>
    import('./view/admin/pages/Admindashboard')
  )
  const Users = lazy(() => import('./view/admin/pages/Users'))
  const EditQuiz = lazy(() => import('./view/admin/pages/EditQuiz'))
  const CoinsAdd = lazy(() => import('./view/user/CoinsAdd'));
  const CoinsCheckout = lazy(() => import('./view/user/CoinCheckout'));
  const ViewQuiz = lazy(() => import('./view/admin/pages/Quiz'))
  const AdminHome = lazy(() => import('./view/admin/pages/Home'))
  const AdminTestSeries = lazy(() => import('./view/admin/pages/Test'))
  const AdminTestEdit = lazy(() => import('./view/admin/pages/TestEdit'))
  const AdminGroupsManage = lazy(() => import('./view/admin/pages/AddAdminGroup'))
  const AdminAddProblem = lazy(() =>
    import('./view/admin/components/AddProblem')
  )
  const CounsellingHome = lazy(() => import('./pages/CounsellingHome'))

  const AdminQuizListing = lazy(() => import('./view/admin/pages/AdminQuizzes'))
  const AdminTestListing = lazy(() => import('./view/admin/pages/AdminTests'))
  const AdmintCampusTestListing = lazy(() =>
    import('./view/admin/pages/AdminCampusTest')
  )
  const AdminProblemsListing = lazy(() =>
    import('./view/admin/pages/AdminProblems')
  )
  const AdminQuestionBankListing = lazy(() =>
    import('./view/admin/pages/AdminQuestionBank')
  )
  const AdminEditTest = lazy(() => import('./view/admin/pages/AdminEditTest'))
  const AdminEditQuiz = lazy(() => import('./view/admin/pages/AdminEditQuiz'))
  const AdminEditCampusTest = lazy(() =>
    import('./view/admin/pages/AdminEditCampusTest')
  )
  const AdminEditProblem = lazy(() =>
    import('./view/admin/pages/AdminEditProblem')
  )
  const AdminEditQuestionBank = lazy(() =>
    import('./view/admin/pages/AdminEditQuestionBank')
  )
  const AdminMailTest = lazy(() => import('./view/admin/pages/AdminMailTest'))
  useEffect(() => {
    dispatch(getUser(token))
  }, [])
  useEffect(() => {
    if (user) {
      console.log(user)
      if (!user?.rankData) {
        dispatch(getRank(user._id, user?.university))
      }
    }
  }, [user])
  // new change
  const { loading } = useSelector(s => s.auth)
  return loading ? (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Loader />
    </div>
  ) : (
    <HelmetProvider>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          TransitionComponent={Slide} // 👈 smooth slide animation
          preventDuplicate
        >
          <Suspense
            fallback={
              <div className='flex h-screen w-screen justify-center items-center'>
                <Loader />
              </div>
            }
          >
            <BrowserRouter>
              <LoginModalProvider>
                <Routes>
                  {/* ============================================================= */}
                  {/*                        Public Routes Starts                   */}
                  {/* ============================================================= */}

                  <Route path='/' element={<Home />} />
                  {/* <Route path="/" element={<>home</>} /> */}
                  <Route path='/profile/:id' element={<UserProfile />} />
                  <Route path='/counselling' element={<CounsellingHome />} />
                  <Route element={<UserRoute />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/signin' element={<Redirect />} />
                    <Route path='/verify/:id' element={<SetUpPassword />} />
                    <Route path='/reset' element={<ForgerPassword />} />
                  </Route>

                  <Route path='/privacy-policy' element={<Policy />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/terms-of-service' element={<Terms />} />
                  {/*  User But Public  */}
                  {/* ============================================================= */}
                  {/*                        Public Routes Starts                   */}
                  {/* ============================================================= */}
                  {/* ============================================================= */}
                  {/*                        User Public Routes Starts              */}
                  {/* ============================================================= */}
                  <Route path='/' element={<UserLayout />}>
                    <Route
                      path='user/practice'
                      element={<UserPracticeArea />}
                    />
                    <Route
                      path='user/binarykeeda-dsa-sheet'
                      element={<UserCoding />}
                    />
                    <Route path='user/resume' element={<ResumeATS />} />
                    <Route
                      path='user/resources'
                      element={<UserResources />}
                    ></Route>
                    <Route
                      path='user/binarykeeda-dsa-sheet/description/:topicName/:problemTitle'
                      element={<UserCodingDescription />}
                    />
                    <Route
                      path='/user/binarykeeda-210-sheet'
                      element={<UserRoadMapSheet />}
                    />
                    <Route
                      path='user/problems'
                      element={<UserCodingProblems />}
                    />
                    <Route
                      path='user/binarykeeda-roadmap-sheet'
                      element={<UserRoadmaps />}
                    />
                    <Route
                      path='user/binarykeeda-roadmap-sheet/blog/:slug'
                      element={<UserBlog />}
                    />
                    <Route
                      path='user/practice/:name'
                      element={<UserQuizList />}
                    />
                  </Route>
                  {/* ============================================================= */}
                  {/*                        User Public Routes Ends                */}
                  {/* ============================================================= */}
                  <Route path='/user/exam/:id' element={<ExamAttempt />}/>
                  {/* ============================================================= */}
                  {/*                        User  Routes Starts                    */}
                  {/* ============================================================= */}
                  <Route
                    path='/user'
                    element={
                      <RoleBasedRoutes requiredRole={'user'}>
                        {' '}
                        <UserLayout />{' '}
                      </RoleBasedRoutes>
                    }
                  >
                    <Route index element={<UserDashboard />} />
                    <Route path='coins-add' element={<CoinsAdd/>} />
                    <Route path='coins-add/:id' element={<CoinsCheckout/>} /> 
                    <Route path='group/:id' element={<UserAssociatedGroup />} />
                    <Route path='roadmaps' element={<UserRoadmaps />} />
                    <Route path='profile' element={<UserProfile />} />
                    <Route
                      path='solutions/list/:slug'
                      element={<UserSolutionsList />}
                    />
                    <Route element={<UserTestOptions />} path='test-series/' />
                    <Route element={<UserTestList />} path='test-series/:id' />
                    <Route element={<UserPreview />} path='preview/:id' />
                    <Route
                      element={<UserTestPreview />}
                      path='test/preview/:id'
                    />
                  </Route>
                  <Route element={<RoleBasedRoutes requiredRole={'user'} />}>
                    <Route element={<UserSolution />} path='user/quiz/:slug' />
                    <Route
                      element={<UserTestAttempt />}
                      path='user/test/:slug'
                    />
                  </Route>
                  <Route
                    path='user/problem/:slug'
                    element={<UserCodingProblemsAttempt />}
                  />
                  {/* ============================================================= */}
                  {/*                        User  Routes Ends                     */}
                  {/* ============================================================= */}
                  {/* ============================================================= */}
                  {/*                        Admin Routes Starts                    */}
                  {/* ============================================================= */}

                  <Route
                    path='/admin'
                    element={
                      <RoleBasedRoutes requiredRole={'admin'}>
                        <AdminLayout />
                      </RoleBasedRoutes>
                    }
                  >
                    <Route index element={<AdminHome />} />
                    <Route path='view/:id' element={<ViewQuiz />} />
                    <Route path='test-series' element={<AdminTestSeries />} />
                    <Route path='add/problem' element={<AdminAddProblem />} />
                    {/* Fresh admin routes */}
                    <Route path='test' element={<AdminTestListing />} />
                    <Route path='edit/test/:id' element={<AdminEditTest />} />
                    <Route
                      path='campustest'
                      element={<AdmintCampusTestListing />}
                    />
                    <Route
                      path='edit/campustest/:id'
                      element={<AdminEditCampusTest />}
                    />
                    <Route path='problems' element={<AdminProblemsListing />} />
                    <Route
                      path='edit/problems/:id'
                      element={<AdminEditProblem />}
                    />
                    <Route path='users' element={<></>} />
                    <Route path='quiz' element={<AdminQuizListing />} />
                    <Route path='edit/quiz/:id' element={<AdminEditQuiz />} />
                    <Route
                      path='questionbank'
                      element={<AdminQuestionBankListing />}
                    />
                    <Route
                      path='edit/questionbanks/:id'
                      element={<AdminEditQuestionBank />}
                    />
                    <Route path='mail/:testId' element={<AdminMailTest />} />
                    <Route path='groups' element={<AdminGroupsManage />} />
                    <Route path='sections' element={<></>} />
                  </Route>
                  {/* ============================================================= */}
                  {/*                        Admin Routes Ends                    */}
                  {/* ============================================================= */}
                  <Route  path='/campus-admin'  element={    <ExternalRedirect url={ADMIN_URL} />  } />
                  <Route
                    path='/campus-superadmin'
                    element={
                      <ExternalRedirect url={ADMIN_URL} />
                    }
                  />

                  <Route path='*' element={<NotFound />} />
                </Routes>
              </LoginModalProvider>
            </BrowserRouter>
          </Suspense>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
