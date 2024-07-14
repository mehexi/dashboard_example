import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const BestBuyer = ({ user }) => {
  console.log(user);

  const sortedUsers = user.data.sort(
    (a, b) => b.transactions.length - a.transactions.length
  );

  const top5Users = sortedUsers.slice(0, 5);

  console.log(top5Users);

  return (
    <Card className="col-span-6 md:col-span-4 bg-primary-foreground">
      <CardHeader>
        <CardTitle>Top Buyer</CardTitle>
      </CardHeader>
      <CardContent>
        <BestBuyerTable data={top5Users} />
      </CardContent>
    </Card>
  );
};

export default BestBuyer;

const BestBuyerTable = ({ data }) => {

    const getRankClasses = (rank) => {
        switch (rank) {
          case 0:
            return 'bg-purple-700/30 text-purple-300';
          case 1:
            return 'bg-purple-800/50 text-purple-200';
          case 2:
            return 'bg-teal-600/50 text-teal-200';
          case 3:
            return 'bg-yellow-600/50 text-yellow-200';
          case 4:
            return 'bg-orange-600/50 text-orange-200';
          default:
            return 'bg-gray-400/50 text-gray-200';
        }
      };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seller Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Product Pursued</TableHead>
          <TableHead>Rank</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((topUser, index) => (
          <TableRow key={topUser._id} className="capitalize">
            <TableCell>{topUser.name}</TableCell>
            <TableCell>{topUser.email} </TableCell>
            <TableCell>{topUser.transactions.length}</TableCell>
            <TableCell><div className={`w-fit px-2 py-1 rounded text-center flex my-auto ${getRankClasses(index)}`}>Top {index +1}</div></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
