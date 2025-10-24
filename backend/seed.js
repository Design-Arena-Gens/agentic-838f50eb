require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing data');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: adminPassword,
        role: 'admin',
        emailVerified: true,
        mobileVerified: false
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        passwordHash: userPassword,
        role: 'user',
        emailVerified: true,
        mobileVerified: false
      }
    ]);

    console.log('Created users');

    const products = await Product.insertMany([
      {
        title: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 79.99,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
        category: 'Electronics',
        stock: 50,
        attributes: { color: 'Black', brand: 'AudioTech' }
      },
      {
        title: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
        price: 199.99,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
        category: 'Electronics',
        stock: 30,
        attributes: { color: 'Silver', brand: 'TechWear' }
      },
      {
        title: 'Laptop Backpack',
        slug: 'laptop-backpack',
        description: 'Durable and stylish backpack with padded laptop compartment, USB charging port, and water-resistant material.',
        price: 49.99,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
        category: 'Accessories',
        stock: 100,
        attributes: { color: 'Gray', material: 'Polyester' }
      },
      {
        title: 'Mechanical Gaming Keyboard',
        slug: 'mechanical-gaming-keyboard',
        description: 'RGB backlit mechanical keyboard with customizable keys and anti-ghosting technology.',
        price: 89.99,
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
        category: 'Electronics',
        stock: 45,
        attributes: { color: 'Black', switchType: 'Blue' }
      },
      {
        title: 'Wireless Mouse',
        slug: 'wireless-mouse',
        description: 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
        price: 29.99,
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
        category: 'Electronics',
        stock: 75,
        attributes: { color: 'Black', connectivity: 'Wireless' }
      },
      {
        title: 'USB-C Hub Adapter',
        slug: 'usb-c-hub-adapter',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
        price: 39.99,
        images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500'],
        category: 'Accessories',
        stock: 60,
        attributes: { ports: '7', color: 'Gray' }
      },
      {
        title: 'Portable Phone Charger',
        slug: 'portable-phone-charger',
        description: '20000mAh power bank with fast charging and dual USB ports.',
        price: 34.99,
        images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'],
        category: 'Accessories',
        stock: 80,
        attributes: { capacity: '20000mAh', color: 'Black' }
      },
      {
        title: 'Webcam HD 1080p',
        slug: 'webcam-hd-1080p',
        description: 'Full HD webcam with auto-focus and built-in microphone for video calls and streaming.',
        price: 59.99,
        images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500'],
        category: 'Electronics',
        stock: 40,
        attributes: { resolution: '1080p', brand: 'VisionCam' }
      },
      {
        title: 'Desk Lamp LED',
        slug: 'desk-lamp-led',
        description: 'Adjustable LED desk lamp with touch control and multiple brightness levels.',
        price: 44.99,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
        category: 'Home & Office',
        stock: 55,
        attributes: { color: 'White', powerSource: 'USB' }
      },
      {
        title: 'Notebook Set',
        slug: 'notebook-set',
        description: 'Premium notebook set with 3 hardcover journals, perfect for writing and sketching.',
        price: 24.99,
        images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500'],
        category: 'Stationery',
        stock: 120,
        attributes: { pages: '200', color: 'Assorted' }
      },
      {
        title: 'Wireless Earbuds',
        slug: 'wireless-earbuds',
        description: 'True wireless earbuds with charging case, touch controls, and crystal clear sound.',
        price: 69.99,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'],
        category: 'Electronics',
        stock: 65,
        attributes: { color: 'White', batteryLife: '24 hours' }
      },
      {
        title: 'Phone Stand Holder',
        slug: 'phone-stand-holder',
        description: 'Adjustable phone stand for desk with anti-slip base and cable management.',
        price: 19.99,
        images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'],
        category: 'Accessories',
        stock: 90,
        attributes: { material: 'Aluminum', color: 'Silver' }
      }
    ]);

    console.log('Created products');
    console.log('\nSeed data created successfully!');
    console.log('\nTest accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
