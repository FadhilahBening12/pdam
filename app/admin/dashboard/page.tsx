import GetMeApi from "@/services/getMe"
import { GetMe } from "@/types/getMe";
import { redirect } from "next/navigation";

const dashboardPage = async () => {
    let nama='';
    let role='';
    const response = await GetMeApi();
    if(!response.status){
        redirect('/admin/login');
    }else {
        nama = response.data?.name ||'';
        role = response.data?.user?.role||'';
    }
    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        <div className="border border-gray-500 rounded-md p-2">
            <div>Nama anda</div>
            <div>{nama}</div>
            <div>role anda</div>
            <div>{role}</div>
        </div>
    </div>
    )
}
export default dashboardPage