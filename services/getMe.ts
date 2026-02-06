import { BASE_API_URL } from "@/global";
import axios from "axios";
import { Data } from "@/types/getMe"; 
import { getServerCookie } from "@/lib/server-cookie";
type ResponseData = {
    status: boolean
    message: string
    data?: Data
}

const GetMeApi = async (): Promise<ResponseData> => {    
    try{
        const token = await getServerCookie("token");
        console.log(token);
        const response = await axios.get(`${BASE_API_URL}/admins/me`, {
            headers: {
                "Content-Type": "application/json", 
                'app-key': '61bc2b2fb40c9f9b750e247606717c77763649be',
                'authorization': `Bearer ${token}`
            },
        });
        const data = response.data;
        return {
            status: true,
            message: "User data fetched successfully",
            data: data.data 
        };


    } catch(error){
        return{
            status: false,
            message: "Failed to fetch user data"
        };
    } 
}
export default GetMeApi;