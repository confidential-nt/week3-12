import React, { useState } from 'react';
import data from '../data.json';

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === productName && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleConfirmOrder = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Product List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((product, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
            }}
          >
            <img
              src={product.image.thumbnail}
              alt={product.name}
              style={{ width: '100%' }}
            />
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <h2>{item.name}</h2>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
          ))}
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
            }}
          >
            <h2>Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  style={{ width: '50px', marginRight: '10px' }}
                />
                <p>{item.name}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
