import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Typography,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// ✅ Fetch groups
const fetchGroups = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/api/admin/groups?search=${query}`,
    { withCredentials: true }
  )
  return res.data.groups
}

// ✅ Delete group
const deleteGroup = async (groupId) => {
  await axios.get(`${BASE_URL}/api/admin/groups/admin/delete/${groupId}`, {
    withCredentials: true,
  })
}

export default function AddAdminGroup() {
  const query = "" // can make this dynamic later
  const queryClient = useQueryClient()

  // Fetch groups
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups', query],
    queryFn: () => fetchGroups(query),
  })

  // Delete mutation
  const mutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']) // 🔄 refresh groups after delete
    },
  })

  if (isLoading) return <Box sx={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}><CircularProgress /></Box>
  if (isError) return <Typography color="error">Error fetching groups</Typography>

  return (
    <TableContainer elevation={0} component={Paper} sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Group Admin</TableCell>
            <TableCell sx={{ fontWeight: 'bold' , pr:10 }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((g, index) => (
            <TableRow key={g._id} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{g?.group.groupName}</TableCell>
              <TableCell>{g?.userId?.name}</TableCell>
              <TableCell align="right" sx={{pr:10}}>
                <IconButton
                  color="error"
                  onClick={() => mutation.mutate(g.group._id)}
                  disabled={mutation.isLoading}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
