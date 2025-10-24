import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>{error}</div>;
  if (!product) return <div style={styles.container}>Product not found</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/products')} style={styles.backButton}>
        ← Back to Products
      </button>
      
      <div style={styles.content}>
        <div style={styles.imageSection}>
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.title} style={styles.image} />
          ) : (
            <div style={styles.placeholder}>No Image</div>
          )}
        </div>
        
        <div style={styles.details}>
          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          
          <p style={styles.description}>{product.description}</p>
          
          <p style={styles.stock}>
            {product.stock > 0 ? `In Stock: ${product.stock} available` : 'Out of Stock'}
          </p>
          
          {product.stock > 0 && (
            <div style={styles.actions}>
              <div style={styles.quantityControl}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityButton}
                >
                  -
                </button>
                <span style={styles.quantity}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>
              
              <button onClick={handleAddToCart} style={styles.addButton}>
                Add to Cart
              </button>
            </div>
          )}
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
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem'
  },
  imageSection: {
    width: '100%',
    height: '500px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
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
    color: '#999',
    fontSize: '1.5rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold'
  },
  category: {
    fontSize: '1.2rem',
    color: '#666'
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#333'
  },
  stock: {
    fontSize: '1rem',
    color: '#666'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '2rem'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '0.5rem'
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    fontSize: '1.2rem',
    borderRadius: '4px'
  },
  quantity: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    minWidth: '40px',
    textAlign: 'center'
  },
  addButton: {
    flex: 1,
    padding: '1rem 2rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  }
};

export default ProductDetail;
