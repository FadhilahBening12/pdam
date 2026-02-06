import GetMeApi from "@/services/getMe";
import { GetService } from "@/services/service";
import { GetMe } from "@/types/getMe";
import { redirect } from "next/navigation";
import dashboardPage from "../dashboard/page";
import Link from "next/link";

const ServicesPage = async () => {
    const { data } = await GetService();
    console.log(data);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Services</h1>
            <p>Manage your services here.</p>
            <Link
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                href="/admin/services/create"
            >
                Create New Service
            </Link>
        </div>
    );
};

export default ServicesPage;
