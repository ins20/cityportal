import { ENDPOINT_CATEGORY, BASE_URL } from './endpoints'

export const categoryApi = {
    getAll: async () => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_CATEGORY}`, {
                method: "GET"
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_CATEGORY}/${id}`, {
                method: "DELETE",
            })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    },
    create: async (values) => {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT_CATEGORY}`, {
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