import { APP_KEY, BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookie";
import { Service } from "@/types/getService";
import axios from "axios";

type ResponseData = {
    status: boolean;
    message: string;
    data?: Service[];
};

export const GetService = async (): Promise<ResponseData> => {
    try {
        const token = await getServerCookie("token");

        const response = await axios.get(
            `${BASE_API_URL}/services?page=1&quantity=10`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "app-key": `${APP_KEY}`,
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const data = response.data
        return {
            status: true,
            message: "Succesfully fetched succesfully",
            data: data.data
        };
    } catch (error) {
        return {
            status: false,
            message: "Failed to fetch services",
        };
    }
};
export default GetService;