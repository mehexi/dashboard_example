import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const CartItems = ({ data, onCartUpdate }) => {
    const [cartData, setCartData] = useState(data);

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCartData = cartData.map(item => {
            if (item._id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartData(updatedCartData);
        onCartUpdate(updatedCartData);
    };

    useEffect(() => {
        setCartData(data);
    }, [data]);

    return (
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
            <CardDescription>{cartData.length} items</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead> </TableHead>
                </TableRow>
              </TableHeader>
              {cartData.map((item) => (
                <ItemCard item={item} key={item._id} onQuantityChange={handleQuantityChange} />
              ))}
            </Table>
          </CardContent>
        </Card>
    );
};

export default CartItems;
