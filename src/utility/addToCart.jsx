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
