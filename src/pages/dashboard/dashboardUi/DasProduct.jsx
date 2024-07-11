import axiosInstance from '@/axios/AxiosIntence';
import { Card } from '@/components/ui/card';
import{ useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel';

const DasProduct = () => {
    const [product,setProduct] = useState(null)
    useEffect(() => {
        const fetchProduct = async () => {
            const res =await  axiosInstance('/client/products')
            console.log(res.data)
            setProduct(res.data)
        }
        fetchProduct()
    },[])

    return (
        <Card className='col-span-5 md:col-span-2 overflow-hidden'>
            <ProductCarousel data={product} />
       </Card>
    );
};

export default DasProduct;