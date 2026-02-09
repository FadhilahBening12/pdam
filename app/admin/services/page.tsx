import GetMeApi from "@/services/getMe";
import { GetService } from "@/services/service";
import { GetMe } from "@/types/getMe";
import { redirect } from "next/navigation";
import dashboardPage from "../dashboard/page";
import Link from "next/link";
import FormAddService from "./formAdd";

const ServicesPage = async () => {
    const { data } = await GetService();
    console.log(data);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 ">Admin Services</h1>
            <p className="my-4">Manage your services here.</p>
            <FormAddService label="Tambah Service" className="bg-blue-500 text-white px-4 py-2 rounded mb-4"/>
            <div className="grid grid-cols-5 gap-4 mt-4">
               {data && data.map((service)=>(
                  <div key={service.id} className="border p-4 rounded shadow">
                     <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                     <p>Min Usage: {service.min_usage}</p>
                     <p>Max Usage: {service.max_usage}</p>
                     <p>Price: ${service.price}</p>
                  </div>
               ))}
            </div>
       </div>
    );
};

export default ServicesPage;
