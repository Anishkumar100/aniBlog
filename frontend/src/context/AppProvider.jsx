import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()

    const [token, setToken] = useState(null) //for doing some admin operations
    const [blogs, setBlogs] = useState([]) // getting published blogs
    const [input, setInput] = useState("")  // searching or filtering blogs

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    const fetchBlogs = async () => //publishedBlogs
    {
        try {
            const { data } = await axios.get('api/blog/all')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)

        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const value = {
        token, setToken, blogs, setBlogs, input, setInput, navigate, axios,setDarkMode,darkMode
    }





    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(AppContext)
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
       → Used to check if admin is authenticated.
       → Automatically attached to API requests (in the headers) if it exists in localStorage.

   ✏️ `input` — holds search/filter input from the user.
       → Example: If the user types "React", this value becomes "React".
       → You can use it to filter blogs: only show blogs that match the keyword.
       → Makes searching blogs easier in real-time.

   📝 `blogs` — stores all the published blogs fetched from the backend.
       → This is the main list shown on the home page.
       → Comes from `/api/blog/all` route (only published ones).

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
*/
