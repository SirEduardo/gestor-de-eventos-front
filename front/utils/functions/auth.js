import { fetchWrapper } from "../api/api"

export const loginFetch = async (email, password) => {
   try {
   const response = await fetchWrapper("/auth/login", "POST", { email, password })
   return response
   } catch (error) {
    return { error: error.message }
   }
}

export const registerFetch = (name, email, password) => {
    return fetchWrapper("/auth/register", "POST", { name, email, password })
}