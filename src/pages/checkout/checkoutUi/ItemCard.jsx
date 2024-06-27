import QuantitySelector from '@/components/coustomUi/QuantitySelector';
import { TableCell, TableRow } from '@/components/ui/table';
import config from '@/config';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ItemCard = ({ item, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        // Update the item quantity in localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(cartItem => {
            if (cartItem._id === item._id) {
                return { ...cartItem, quantity };
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Call the parent function to update the quantity
        onQuantityChange(item._id, quantity);
    }, [quantity, item._id, onQuantityChange]);

    return (
        <TableRow>
            <TableCell>
                <div className='flex gap-3'>
                    <img src={`${config.API_BASE_URL}${item.images[0]}`} className='aspect-square object-cover w-14 h-14 rounded-lg' alt={item.name} />
                    <div>
                        <h1>{item.name}</h1>
                        <h1>{item.sku}</h1>
                    </div>
                </div>
            </TableCell>
            <TableCell>{item.price.toFixed(2)}</TableCell>
            <TableCell>
                <QuantitySelector
                    available={item.stock}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </TableCell>
            <TableCell>{(item.price * quantity).toFixed(2)}</TableCell>
            <TableCell><Trash2 size={14} /></TableCell>
        </TableRow>
    );
};

export default ItemCard;
