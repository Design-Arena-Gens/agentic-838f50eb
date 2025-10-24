import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to Our E-Commerce Store</h1>
        <p style={styles.subtitle}>
          Discover amazing products at great prices
        </p>
        <Link to="/products" style={styles.button}>
          Shop Now
        </Link>
      </div>
      
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>🚚 Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div style={styles.feature}>
          <h3>💳 Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div style={styles.feature}>
          <h3>🔄 Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div style={styles.feature}>
          <h3>📧 Email Verified</h3>
          <p>Secure account verification</p>
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
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#333'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '2rem'
  },
  button: {
    display: 'inline-block',
    padding: '1rem 2rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  feature: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

export default Home;
