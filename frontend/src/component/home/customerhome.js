// Home.js
import React from 'react';
import './customerhome.css';
import Nav from "../nav/customernav";

function Home() {
  return (
    <div className="home-container">
      <Nav />
      <header className="hero-section" style={{ backgroundImage: "url('/Homeimages/glass.jpg')" }}>
        <div className="hero-text">
          <h1>Welcome to Lanka Glass House</h1>
          <p>Your one-stop shop for all glass and mirror needs.</p>
          <a href="#products" className="hero-button">Explore Our Products</a>
        </div>
      </header>

      <section id="products" className="products-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src="/Homeimages/glass-image.jpg" alt="Glass" />
            <h3>Glass</h3>
            <p>High-quality glass for all purposes.</p>
          </div>
          <div className="product-card">
            <img src="/Homeimages/mirror-image.jpg" alt="Mirror" />
            <h3>Mirror</h3>
            <p>Elegant mirrors to enhance your space.</p>
          </div>
          <div className="product-card">
            <img src="/Homeimages/custom-image.jpg" alt="Custom Designs" />
            <h3>Custom Designs</h3>
            <p>Custom glass and mirror designs to fit your needs.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
      <div className="about">
        <h2>About Us</h2>
        </div>
        <p>We are a family-owned business with over 20 years of experience in providing top-quality glass and mirror products. Our commitment is to ensure customer satisfaction through our exceptional products and services.</p>
      </section>

      <section className="contact-section">
        
        <h2>Contact Us</h2>
        
        <p>Have questions or need a quote? Reach out to us!</p>
        <a href="/contact" className="contact-button">Contact Us</a>
      </section>
    </div>
  );
}

export default Home;
