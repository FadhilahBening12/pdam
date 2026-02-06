'use client';
import Link from "next/link";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"


const LoginPage = () => {
    const[Name, setName] = useState<string>("")
    const[username, setUsername] = useState<string>("")
    const[password, setPassword] = useState<string>("")
    const[showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
       try {
           e.preventDefault()
           const url = `${BASE_API_URL}/auth`
           const payload = JSON.stringify({username, password })
           const { data } = await axios.post(url, payload, {
               headers: { "Content-Type": "application/json" }
           })
           if (data.status == true) {

               const role = data.role
                if (role === `CUSTOMER`) {
               toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, 
               type: "success", autoClose: 2000 })
               storeCookie("token", data.token)
               storeCookie("role", data.role)
               setTimeout(() => {router.refresh(); router.push('/customer/dashboard')}, 1000);
               }
             else {
                toast(`You are not admin`, { hideProgressBar: true, containerId: 
                `toastLogin`, type: "success",autoClose: 2000  }) 
             }    
           }
           else toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
       } catch (error) {
           console.log(error);
           toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
       }
   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer containerId={`toastLogin`}/>
        <div className="w-4/12 p-8 bg-white rounded-3xl shadow-md">
            <h1 className="text-2xl text-black font-bold mb-4">Admin Login</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input className="text-black w-full p-2 border border-gray-300 rounded" type="text" id="username" name="username" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input className="text-black w-full p-2 border border-gray-300 rounded" type="password" id="password" name="password" />
                </div>
                <button className="w-full bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 text-white p-2 rounded hover:bg-green-300" type="submit">Login</button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm mt-4">Forgot your password <Link href="/admin/register" className="text-blue-500 hover:underline">Forgot Password?</Link></p>
                   
            </div>
        </div>
    </div>
  )
};
export default LoginPage;