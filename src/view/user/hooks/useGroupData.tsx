import { useQuery } from "@tanstack/react-query"
import { GROUP_ROUTES, userApi } from "./api"

const fetchGroupData = async (userId :string) => {
   const res = await userApi.get(GROUP_ROUTES.GET_USER_GROUP+userId)
   return res.data;
}

const fetchSectionData = async (userId: string,id: string) => {
   const res = await userApi.get(GROUP_ROUTES.GET_USER_SECTION+userId +"/" +id)
   
   return res.data;
} 
const useGroupData = ({userId}: {
    userId: string
}) => {
    return useQuery({
        queryKey:['groupData', userId],
        queryFn: () => fetchGroupData(userId)
    }) 
}

const useSectionData = ({userId,id}: {
    userId: string,
    id: string  
}) => {
    return useQuery({
        queryKey : ['sectionData' , userId, id],
        queryFn : () => fetchSectionData(userId , id)
    })
}

export  {useSectionData};
export default useGroupData;