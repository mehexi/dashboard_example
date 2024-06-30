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
import { ChevronDown } from "lucide-react";

const OrderList = ({ data }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  console.log(data);

  const orders = data?.orders;
  if (!orders) {
    return <h1>Loading...</h1>;
  }

  const toggleDetails = (e, orderId) => {
    e.stopPropagation();
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  console.log(config);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Customer</TableHead>
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
              <TableCell><span>{order.orderStat}</span></TableCell>
              <TableCell>{order.products.length}</TableCell>
              <TableCell className="text-right">{order.cost}</TableCell>
              <TableCell className="text-right">
                <button onClick={(e) => toggleDetails(e, order._id)}>
                  <ChevronDown
                    className={
                      expandedOrderId === order._id
                        ? "rotate-180 duration-300"
                        : "duration-300"
                    }
                  />
                </button>
              </TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="p-0" colSpan={6}>
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
                          <TableCell>
                            <div className="flex gap-3 justify-start items-center">
                              {product.productID.images && product.productID.images[0] && (
                                <img
                                  src={`${config.API_BASE_URL}${product.productID.images[0]}`}
                                  alt="product"
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <h1>{product.productID.name}</h1>
                            </div>
                          </TableCell>
                          <TableCell colSpan={1} className='capitalize'>{product.productID.status}</TableCell>
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
