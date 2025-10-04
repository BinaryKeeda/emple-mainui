import Cookies from 'js-cookie'
export const getUserToken = async () => {
  // const auth = getAuth(); // Initialize Firebase Auth
  // const user = auth.currentUser; // Get the currently logged-in user

  // if (user) {
  //   try {
  //     const token = await user.getIdToken(); // Fetch the token
  //     console.log("User ID Token:", token);
  //     return token; // Return the token for further use
  //   } catch (error) {
  //     console.error("Error fetching user token:", error);
  //     throw error;
  //   }
  // } else {
  //   console.log("No user is logged in");
  //   return null;
  // }
  return Cookies.get('token');
};

