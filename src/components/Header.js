import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import Order from './Order';

/**
 * Функция для отображения списка заказов.
 * @param {object} props - Свойства компонента.
 * @param {Array<object>} props.orders - Список заказов.
 * @param {Function} props.onDelete - Функция для удаления заказа.
 * @param {Function} props.openPaymentModal - Функция для открытия модального окна оплаты.
 * @returns {JSX.Element} Элемент списка заказов.
 */
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

/**
 * Функция для отображения пустой корзины.
 * @returns {JSX.Element} Элемент с информацией о пустой корзине.
 */
const showNothing = () => (
  <div className='empty'>
    <h2>Корзина пуста</h2>
  </div>
);

/**
 * Функциональный компонент для отображения заголовка страницы.
 * @param {object} props - Свойства компонента.
 * @param {Array<object>} props.orders - Список заказов.
 * @param {Function} props.onDelete - Функция для удаления заказа.
 * @param {Function} props.openPaymentModal - Функция для открытия модального окна оплаты.
 * @returns {JSX.Element} Элемент заголовка страницы.
 */
export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);

  return (
    <header>
      <div>
        <span className='logo'>House staff</span>
        <ul className='nav'>
          <li>О нас</li>
          <li>Контакты</li>
          <li>Кабинет</li>
        </ul>
        <FaShoppingCart 
          onClick={() => setCartOpen(cartOpen => !cartOpen)} 
          className={`shop-cart-button ${cartOpen && 'active'}`} 
          role="button" 
          aria-label="shopping cart" 
        />
        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className='presentation'></div>
    </header>
  );
}
