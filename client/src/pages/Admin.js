import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useHref } from 'react-router-dom'
const Admin = () => {
    const href = useHref()
    return (
        <>
            <nav className="nav nav-pills flex-column flex-sm-row">
                <Link to='applications' className={`flex-sm-fill text-sm-center nav-link ${href === '/admin/applications' && 'active'}`} aria-current="applications" >Заявки</Link>
                <Link to='categories' className={`flex-sm-fill text-sm-center nav-link ${href === '/admin/categories' && 'active'}`} aria-current="categories">Категории</Link>
            </nav >
            <Outlet />
        </>
    )
}

export default Admin