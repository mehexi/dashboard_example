export const addToCart = (data) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, data];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('Added to cart:', data);

    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };
  
  export const getFromCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
};
