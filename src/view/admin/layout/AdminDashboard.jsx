import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'

export default function AdminDashboard ({ children }) {
  return (
    <>
      <AdminHeader />
      <main className='p-10 min-h-[calc(100vh-70px)] bg-gray-50'>{children || <Outlet />}</main>
    </>
  )
}
