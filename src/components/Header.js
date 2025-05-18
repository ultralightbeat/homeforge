import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import Order from './Order';
import BurgerMenu from './BurgerMenu'; // Убедись, что путь корректный

const showOrders = (props) => {
  const totalPrice = props.orders.reduce((acc, order) => acc + order.price * order.count, 0);
  return (
    <div>
      {props.orders.map(el => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'>Сумма: {totalPrice}₽</p>
      <button className='payment-button' onClick={() => props.openPaymentModal(props.orders)}>Перейти к оплате</button>
    </div>
  );
};

const showNothing = () => (
  <div className='empty'>
    <h2>Корзина пуста</h2>
  </div>
);

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { title: 'О нас' },
    { title: 'Контакты' },
    { title: 'Кабинет' }
  ];

  return (
    <header>
      <div className="header-container">
        <span className='logo'>House staff</span>

        {/* Меню */}
        <BurgerMenu navLinks={navLinks} />

        {/* Корзина */}
        <FaShoppingCart 
          onClick={() => setCartOpen(prev => !prev)} 
          className={`shop-cart-button ${cartOpen ? 'active' : ''}`} 
          role="button" 
          aria-label="shopping cart" 
        />
      </div>

      {cartOpen && (
        <div className='shop-cart'>
          {props.orders.length > 0 ? showOrders(props) : showNothing()}
        </div>
      )}

      <div className='presentation'></div>
    </header>
  );
}
