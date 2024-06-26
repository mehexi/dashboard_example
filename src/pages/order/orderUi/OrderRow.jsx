import React from "react";
import {
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TableRow,
  TableCell,
} from "@/components/ui/table";

const OrderRow = ({ order }) => (
  <AccordionTrigger asChild>
    <div>
      <TableRow className="cursor-pointer">
        <TableCell>{order.id}</TableCell>
        <TableCell>
          <div>
            {order.customer}
            <br />
            <span className="text-sm text-gray-500">{order.email}</span>
          </div>
        </TableCell>
        <TableCell>
          <div>
            {order.date} {order.time}
          </div>
        </TableCell>
        <TableCell>
          <div>{order.items}</div>
        </TableCell>
        <TableCell>
          <div>{order.price}</div>
        </TableCell>
        <TableCell>
          <div>{order.status}</div>
        </TableCell>
      </TableRow>
    </div>
  </AccordionTrigger>
);

export default OrderRow;
