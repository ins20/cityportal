import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./app";

import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import Applicatons from './components/ApplicationsEdit'
import Categories from './components/CategoriesEdit'

import { ProtectedRoute, ProtectedAdminRoute } from "./components/ProtectedRoute";

import './style.css'


export const AuthContext = createContext(null);
export const ApplicationContext = createContext(null);
export const CategoryContext = createContext(null);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: "main",
                element: <Main />,
            },
            {
                path: "profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
            {
                path: "admin",
                element: <ProtectedRoute><ProtectedAdminRoute><Admin /></ProtectedAdminRoute></ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <Applicatons />,
                    },
                    {
                        path: "applications",
                        element: <Applicatons />,
                    },
                    {
                        path: "categories",
                        element: <Categories />,
                    },
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);