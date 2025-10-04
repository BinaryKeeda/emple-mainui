import { useQuery } from "@tanstack/react-query"
import { GROUP_ROUTES, userApi } from "./api"

const fetchGroupData = async (userId) => {
   const res = await userApi.get(GROUP_ROUTES.GET_USER_GROUP+userId)
   return res.data;
}

const fetchSectionData = async (userId) => {
   const res = await userApi.get(GROUP_ROUTES.GET_USER_SECTION+userId)
   return res.data;
} 
const useGroupData = ({userId}) => {
    return useQuery({
        queryKey:['groupData', userId],
        queryFn: () => fetchGroupData(userId)
    }) 
}

const useSectionData = ({userId}) => {
    return useQuery({
        queryKey : ['sectionData' , userId],
        queryFn : () => fetchSectionData(userId)
    })
}

export  {useSectionData};
export default useGroupData;