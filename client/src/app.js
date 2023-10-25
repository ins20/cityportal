import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthContext, CategoryContext } from ".";
import { ApplicationContext } from ".";
import { userApi } from './api/user'
import { applicationApi } from "./api/application";
import { categoryApi } from "./api/category";

export default function App() {
    const [currentUser, setCurrentUser] = useState();
    const [applications, setApplications] = useState();
    const [categories, setCategories] = useState();

    async function getUser() {
        const userId = localStorage.getItem('userId')
        if (userId) {
            const user = await userApi.getMe(userId)
            setCurrentUser(user)
        }
    }
    async function getApplications() {
        const applications = await applicationApi.getAll()
        setApplications(applications)
    }
    async function getCategories() {
        const categories = await categoryApi.getAll()
        setCategories(categories)
    }
    useEffect(() => {
        getUser()
        getApplications()
        getCategories()
    }, [])
    return (
        <>  
            <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
                <Header />
                <div className="container">
                    <ApplicationContext.Provider value={{ applications, setApplications }}>
                        <CategoryContext.Provider value={{ categories, setCategories }}>
                            <Outlet />
                        </CategoryContext.Provider>
                    </ApplicationContext.Provider>
                </div>
            </AuthContext.Provider>
        </>
    );
}