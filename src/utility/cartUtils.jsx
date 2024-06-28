export const addToCart = (data) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItemIndex = cart.findIndex(item => item._id === data._id);
  
  if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
      cart[existingItemIndex].totalPrice += data.price;
  } else {
      const newItem = {
          ...data,
          quantity: 1,
          totalPrice: data.price
      };
      cart.push(newItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Added to cart:', data);

  const event = new Event('cartUpdated');
  window.dispatchEvent(event);
};

export const getFromCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
};

export const removeFromCart = (itemId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item._id !== itemId);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  console.log('Removed from cart:', itemId);

  const event = new Event('cartUpdated');
  window.dispatchEvent(event);
};
