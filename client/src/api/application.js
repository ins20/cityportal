import { BASE_URL, ENDPOINT_APPLICATION } from './endpoints'

export const applicationApi = {
    getAll: async () => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_APPLICATION}`, {
                method: "GET"
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_APPLICATION}/${id}`, {
                method: "DELETE",
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    update: async (id, values) => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_APPLICATION}/${id}`, {
                method: "PUT",
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
    create: async (values) => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_APPLICATION}`, {
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
    }
}