import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data.orders);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading orders...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't placed any orders yet</p>
          <Link to="/products" style={styles.shopButton}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={styles.orders}>
          {orders.map((order) => (
            <div key={order._id} style={styles.order}>
              <div style={styles.orderHeader}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.status}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(order.status)
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <span>{item.title} x {item.qty}</span>
                    <span>${item.priceAtPurchase.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div style={styles.orderFooter}>
                <span style={styles.total}>Total: ${order.total.toFixed(2)}</span>
                <Link to={`/orders/${order._id}`} style={styles.viewButton}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  const colors = {
    pending: '#f39c12',
    paid: '#3498db',
    shipped: '#9b59b6',
    delivered: '#27ae60',
    cancelled: '#e74c3c'
  };
  return colors[status] || '#95a5a6';
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
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px'
  },
  shopButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '1rem 2rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  order: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  date: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.25rem'
  },
  status: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  orderItems: {
    marginBottom: '1rem'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f5f5f5'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee'
  },
  total: {
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  viewButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px'
  }
};

export default Orders;
