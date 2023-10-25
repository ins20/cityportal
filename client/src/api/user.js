import { BASE_URL } from './endpoints'

export const userApi = {
    register: async (values) => {
        try {
            const response = await fetch(`${BASE_URL}register`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    login: async (values) => {
        try {
            const response = await fetch(`${BASE_URL}login`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    getMe: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}user/${id}`, {
                method: "GET",
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
}