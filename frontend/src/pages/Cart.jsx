import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <p style={styles.empty}>Your cart is empty</p>
        <Link to="/products" style={styles.shopButton}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      
      <div style={styles.content}>
        <div style={styles.items}>
          {cart.map((item) => (
            <div key={item._id} style={styles.item}>
              <div style={styles.itemImage}>
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.title} style={styles.image} />
                ) : (
                  <div style={styles.placeholder}>No Image</div>
                )}
              </div>
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
              
              <div style={styles.itemActions}>
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={styles.quantityButton}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                
                <p style={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          
          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
          
          <button onClick={clearCart} style={styles.clearButton}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem'
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem'
  },
  shopButton: {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem'
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  item: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  itemImage: {
    width: '100px',
    height: '100px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    color: '#999'
  },
  itemDetails: {
    flex: 1
  },
  itemTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem'
  },
  itemPrice: {
    fontSize: '1rem',
    color: '#666'
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center'
  },
  itemTotal: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  summary: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    height: 'fit-content'
  },
  summaryTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '1rem'
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #ddd',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginTop: '1.5rem'
  },
  clearButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '0.5rem'
  }
};

export default Cart;
