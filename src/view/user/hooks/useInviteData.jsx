import { useQuery } from "@tanstack/react-query"
import { GROUP_ROUTES, userApi } from "./api"

const fetchInviteData = async (userId) => {
    const res = await userApi.get(GROUP_ROUTES.GET_USER_INVITE + userId)
    return res.data;
}
const useInviteData = ({ userId }) => {
    return useQuery({
        queryKey: ['inviteData', userId],
        queryFn: () => fetchInviteData(userId),
        onSuccess: (data, variables, context) => {
            context.queryClient.invalidateQueries(['inviteData', userId])
            context.queryClient.invalidateQueries(['groupData' , userId])
        }

    })
}
export default useInviteData