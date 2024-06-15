import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { FaStar } from 'react-icons/fa6';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axios/AxiosIntence';
import PaginationComp from '@/components/coustomUi/Pagination';
import TableData from '@/components/coustomUi/TableData';
import { formatDate } from '@/utility/dataFromating';
import { API_BASE_URL } from '@/config';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProductView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const tableRef = useRef();

  const {filter} = props

  

  useImperativeHandle(ref, () => ({
    getTableData: () => tableRef.current,
  }));

  const fetchData = async (page, limit) => {
    try {
      const result = await axiosInstance.get(
        `/client/products?page=${page}&limit=${limit}&status=${filter}`
      );
      setTotalData(result.data.total);
      setData(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize,filter]);

  const columns = [
    {
      key: 'image',
      header: <span className="sr-only">Image</span>,
      className: 'hidden w-[100px] sm:table-cell capitalize',
      render: (row) => (
        // console.log(row),
        <img
          alt="data image"
          className="aspect-square rounded-md object-cover border capitalize" 
          height="64"
          src={`${API_BASE_URL}${row.images[0]}`}
          width="64"
        />
      ),
    },
    { key: 'name', header: 'Name', className: 'font-medium capitalize' },
    { key: 'description', header: 'Description', className: 'font-medium capitalize' },
    { key: 'price', header: 'Price', className: 'hidden md:table-cell capitalize' },
    {
      key: 'status',
      header: 'Status',
      className: 'hidden md:table-cell capitalize capitalize',
    },
    {
      key: 'createdAt',
      header: 'Created at',
      className: 'hidden md:table-cell capitalize',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'rating',
      header: 'Rating',
      className: 'hidden md:table-cell capitalize',
      render: (row) => (
        <div className="flex gap-2 items-center">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} color={i < row.rating ? '#FFD700' : '#E0E0E0'} />
            ))}
          </div>
          <span>{row.rating}</span>
        </div>
      ),
    },
  ];

  const onPageSizeChange = (e) => {
    setPageSize(e);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <CardTitle>Product</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <Select value={pageSize} onValueChange={onPageSizeChange}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={15}>15</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      {
        totalData === 0 ? (<CardContent>
          <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
            </p>
            <Link to={'add'}>
              <Button className="mt-4">Add Product</Button>
              </Link>
          </div>
        </CardContent>) :( <CardContent>
        <div ref={tableRef}>
          <TableData
            columns={columns}
            data={data}
            onEdit={(row) => console.log(row._id)}
            onDelete={(row) => console.log(row._id)}
          />
        </div>
            <PaginationComp
              
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalData}
          onPageChange={setCurrentPage}
        />
      </CardContent>)
      }
      
    </Card>
  );
});

ProductView.displayName = 'ProductView';

export default ProductView;
