import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
// using axios in this project instead of fetch


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
// we are fixing the base url in the context file itself, so that we can use it everywhere. u dont need to enter the base url anywhere now if u use axios


const AppContext = createContext()


export const AppProvider = ({ children }) => {
    const navigate = useNavigate() // just imported useNavigate over here so that we dont need to import useNavigate hook everywhere repeatedly

    const [token, setToken] = useState(null) // for user authentication (remeber JWT token?)

    const [blogs, setBlogs] = useState([])

    const [input, setInput] = useState("")  // filtering blogs

    const fetchPublishedBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success ? setBlogs(data.publishedBlogs) : toast.error(data.message)
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchPublishedBlogs()
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    }, [])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext) // here i am returning the useContext() itself so, u can use useContext anywhere u want
}









/*
🌐 What we are doing here — simplified explanation:

✅ 1. Creating a global context using React Context API:
   - `AppContext` lets us share common data (like blogs, token, input, axios, navigate) across the entire app without passing props manually.

✅ 2. Setting the base URL for axios:
   - `axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL`
   - This makes sure all API calls automatically point to your backend, no need to write the full URL every time.

✅ 3. Setting up useful React state variables:

   🔐 `token` — holds the JWT token to check if the user is logged in.
   ✏️ `input` — holds search/filter input to filter blogs on the homepage.
   📝 `blogs` — stores all the published blogs fetched from the backend.

✅ 4. useEffect runs once when the app starts:
   - Calls `fetchPublishedBlogs()` to load all public blogs.
   - Checks localStorage for a saved token (for persistent login).
     If found, sets it in state and attaches it to axios as the default header for protected API calls.

✅ 5. The context value (`value`) includes:
   - All states (`token`, `blogs`, `input`) and their set functions,
   - `navigate` from react-router for redirection,
   - `axios` for making API calls.

✅ 6. Finally, we export:
   - `AppProvider` → wraps around your app to provide access to the context.
   - `useAppContext()` → a custom hook so you can access context data easily in any component.

🎯 In short:
This file sets up a global helper system for your app to manage login, blog data, search input, and backend calls — all from one place!


Moving to Navbar first
*/
