import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import config from "@/config";
import { ChevronDown, Ellipsis, Eye, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const OrderList = ({ data,onEdit,onDelete }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const orders = data?.orders;
  if (!orders) {
    return <h1>Loading...</h1>;
  }

  const toggleDetails = (e, orderId) => {
    e.stopPropagation();
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Completed':
        return 'bg-green-500/20 text-green-500';
      case 'Canceled':
        return 'bg-red-500/20 text-red-500';
      default:
        return '';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Delivery Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Items</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <TableRow>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.userId.name} <br /> {order.userId.email}
              </TableCell>
              <TableCell className='capitalize'>
                {order.location.address}, {order.location.city}, {order.location.state}, {order.location.selectedCountry}
              </TableCell>
              <TableCell><span className={`inline-block px-2 py-1 rounded ${getStatusClass(order.orderStat)}`}>{order.orderStat}</span></TableCell>
              <TableCell>{order.products.length}</TableCell>
              <TableCell className="text-right">{order.cost}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Button variant='outline' size='icon'  onClick={(e) => toggleDetails(e, order._id)}>
                  <ChevronDown
                    className={
                      expandedOrderId === order._id
                        ? "rotate-180 duration-300"
                        : "duration-300"
                    }
                  />
                </Button>
                <Button variant='outline' size='icon' onClick={() => { onEdit(order._id) }}>
                <Pen width={14} height={14} />
                </Button>
                
              </TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="p-0" colSpan={7}>
                <div
                  className={`collapsible-content ${
                    expandedOrderId === order._id ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight:
                      expandedOrderId === order._id
                        ? `${order.products.length * 100}px`
                        : "0",
                  }}
                >
                  <Table className="rounded-md">
                    <TableBody>
                      {order.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell >
                            <div className="flex gap-3 justify-start items-center">
                              {product.productID.images && product.productID.images[0] && (
                                <img
                                  src={`${product.productID.images[0]}`}
                                  alt="product"
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <h1>{product.productID.name}</h1>
                            </div>
                          </TableCell>
                         
                          <TableCell colSpan={1} className='capitalize text-right'>{product.productID.status}</TableCell>
                          <TableCell colSpan={1} className="text-right">
                            {product.productID.price}
                          </TableCell>
                         
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;
