// Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer id="contacts">
      <div className="footer-content">
        <h3>Контакты</h3>

        <div className="footer-columns">
          <div className="footer-column">
            <p><strong>Email:</strong> homehorge@homehorge.ru</p>
            <p><strong>Телефон:</strong> +7 (987) 654-32-10</p>
          </div>

          <div className="footer-column">
            <p><strong>Адрес:</strong> г. Санкт-петербург, ул. Примерочная, д. 1</p>
            <p><strong>Время работы:</strong> Пн-Пт с 9:00 до 18:00</p>
          </div>
        </div>
      </div>

      <div className="copyright">
        &copy; {new Date().getFullYear()} Home Forge. Все права защищены.
      </div>
    </footer>
  );
}