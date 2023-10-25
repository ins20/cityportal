import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '..'
export const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    if (!currentUser) {
        return <Navigate to={'/'} />
    }
    return (
        <>{children}</>
    )
}

export const ProtectedAdminRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    if (currentUser.role !== 'admin') {
        return <Navigate to={'/'} />
    }
    return (
        <>{children}</>
    )
}
