import axiosInstance from "@/axios/AxiosIntence"

export const sendOrderData = async (data) => {
    try {
        const response = axiosInstance.post('/sales', data)
        console.log(response)
    }
    catch (error)  {
        console.error(error)
    }
}