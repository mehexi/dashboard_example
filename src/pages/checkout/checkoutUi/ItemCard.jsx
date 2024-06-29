
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import config from "@/config";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import QuantitySelector from "@/components/coustomUi/QuantitySelector";
import { removeFromCart } from "@/utility/cartUtils";

const ItemCard = ({ item, onQuantityChange, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = useCallback(
    (newQuantity) => {
      setQuantity(newQuantity);
      onQuantityChange(item._id, newQuantity);
    },
    [item._id, onQuantityChange]
  );

  useEffect(() => {
    const updateLocalStorage = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity };
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    updateLocalStorage();
  }, [quantity, item._id]);

  const handleDelete = () => {
    removeFromCart(item._id);
    onDelete(item._id);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-3">
          <img
            src={`${config.API_BASE_URL}${item.images[0]}`}
            className="aspect-square object-cover w-14 h-14 rounded-lg"
            alt={item.name}
          />
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
          setQuantity={handleQuantityChange}
        />
      </TableCell>
      <TableCell>{(item.price * quantity).toFixed(2)}</TableCell>
      <TableCell>
        <Button variant="outline" onClick={handleDelete}>
          <Trash2 size={14} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemCard;
