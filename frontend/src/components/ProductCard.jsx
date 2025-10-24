import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div style={styles.card}>
      <Link to={`/products/${product._id}`} style={styles.link}>
        <div style={styles.imageContainer}>
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.title} style={styles.image} />
          ) : (
            <div style={styles.placeholder}>No Image</div>
          )}
        </div>
        <div style={styles.content}>
          <h3 style={styles.title}>{product.title}</h3>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.stock}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        style={{
          ...styles.button,
          ...(product.stock === 0 ? styles.buttonDisabled : {})
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    backgroundColor: 'white'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5'
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
    color: '#999'
  },
  content: {
    padding: '1rem'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  category: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '0.5rem'
  },
  stock: {
    fontSize: '0.9rem',
    color: '#666'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  }
};

export default ProductCard;
