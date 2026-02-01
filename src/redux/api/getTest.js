import axios from "axios";
import store from "../store";
import { incrementPage, setCurrentPage, setHasMore, setTotalPage, testFailure, testRequest, testSuccess } from "../reducers/testReducer";
import { tuple } from "zod";
import { BASE_URL } from "../../lib/Lib";

export const getTestAdmin = async () => {
    const { data, page , category} = store.getState().test;
    store.dispatch(testRequest());
    try {
        const res = await axios.get(`${BASE_URL}/api/v2/test/get?page=${page}&limit=${10}`  ,{withCredentials:true});

        store.dispatch(incrementPage());
        store.dispatch(setTotalPage(res.data.totalPages));
        store.dispatch(setCurrentPage(res.data.page));
        const quizData = await {
            key: res.data.page,
            value: res.data.data
        }

        store.dispatch(testSuccess(quizData));
        if (res.data.totalPages <= page) {
            store.dispatch(setHasMore());
        }

    } catch (error) {
        store.dispatch(testFailure(error.message));
        console.log(error)
    }
}

