import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress, Typography,
  Box, Pagination, TextField, Dialog, Button
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { useSnackbar } from 'notistack'

// =====================
// API CALLS
// =====================

const fetchGroups = async ({ page, limit, search }) => {
  const res = await axios.get(
    `${BASE_URL}/api/admin/groups?search=${search}&withOwner=true&page=${page}&limit=${limit}`,
    { withCredentials: true }
  )
  return res.data
}

const deleteGroup = async (groupId) => {
  await axios.get(`${BASE_URL}/api/admin/groups/admin/delete/${groupId}`, {
    withCredentials: true,
  })
}

// =====================
// COMPONENT
// =====================

export default function AddAdminGroup() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar();
  // Debounce Search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  // Fetch Groups
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups-admin', page, limit, debouncedSearch],
    queryFn: () => fetchGroups({ page, limit, search: debouncedSearch }),
    keepPreviousData: true,
  })

  // Delete Mutation
  const mutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['groups-admin'])
      enqueueSnackbar('Group deleted successfully', { variant: 'success' });
    },
  })

  if (isError)
    return <Typography color="error">Error fetching groups</Typography>

  return (
    <>
      {/* SEARCH INPUT */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search group..."
          size="small"
          sx={{ width: 300 }}
        />
      </Box>

      {/* TABLE */}
      <TableContainer
        elevation={0}
        component={Paper}
        sx={{ mt: 2, borderRadius: 3, boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Group Admin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Group Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', pr: 10 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* LOADER INSIDE TABLE */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 3 }}>
                    <CircularProgress size={28} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && data?.groups?.map((g, index) => (
              <TableRow key={g._id} hover>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>{g?.group?.groupName}</TableCell>
                <TableCell>{g?.userId?.name}</TableCell>
                <TableCell>{g?.userId?.email}</TableCell>

                <TableCell align="right" sx={{ pr: 10 }}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedGroupId(g.group._id)
                      setOpenDeleteModal(true)
                    }}
                    disabled={mutation.isLoading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && data?.groups?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No groups found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={data?.totalPages || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <Box sx={{ p: 3, width: 350 }}>
          <Typography variant="h6" fontWeight="bold">
            Confirm Delete
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Are you sure you want to delete this group?
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button
              variant="outlined"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                mutation.mutate(selectedGroupId, {
                  onSuccess: () => {
                    setOpenDeleteModal(false)
                    setSelectedGroupId(null)
                  }
                })
              }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
