import axios from "axios";
import { incrementPage, setCurrentPage, setHasMore, setTotalPage, testFailure, testRequest, testSuccess } from "../reducers/testReducerUser";
import store from "../store";
import { BASE_URL } from "../../lib/config";



export const getTestUser = async () => {
    const {  page , category} = store.getState().testUser;
    const userId = store.getState().auth.user?._id;
    store.dispatch(testRequest());
    try {

        const res = await loadTest({
            page,
            category,
            userId,
            limit:20,
            search: '',


        })
        const result = res.data.data.getTests;
        

        store.dispatch(testSuccess({ key: result.page, value: result.data }));
        store.dispatch(setTotalPage(result.totalPages));
        store.dispatch(setCurrentPage(result.page));
        store.dispatch(incrementPage());
        if (result.totalPages <= page) store.dispatch(setHasMore());

    } catch (error) {
        store.dispatch(testFailure(error.message));
        console.log(error)
    }
}


const loadTest = async ({page ,limit , search , category , userId}) => {
    try {
        const res = await axios.post(`${BASE_URL}/graphql` , {
            query: `#graphql
                query GetTests (
                    $page: Int = 1,
                    $limit: Int = 10,
                    $search: String,
                    $category: String,
                    $userId: String!,
                ) {
                getTests(userId:$userId ,page:$page , limit:$limit, search: $search, category: $category) {
                    data {
                        slug
                        _id
                        category
                        name
                        duration
                        attempts
                        description
                    }
                        limit
                        page
                       totalItems,
                        totalPages
                }
            }
    `
    , variables: {page ,limit , search , category , userId}
    },{withCredentials:true})
    return res
    }catch(e) {
        console.log(e)
        throw new Error("Failed to Load")
    }
}