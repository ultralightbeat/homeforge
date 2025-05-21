import React, { useState } from 'react';

const BurgerMenu = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (link, e) => {
    if (link.onClick) {
      e.preventDefault(); // ✅ Теперь e точно есть
      link.onClick(e); // ✅ Передаём событие в пользовательский обработчик
    }
    setMenuOpen(false); // Закрываем меню после клика
  };

  return (
    <>
      {/* Десктопное горизонтальное меню */}
      <ul className="header-nav">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href || '#'} 
              onClick={(e) => handleClick(link, e)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Бургер кнопка */}
      <button 
        className="burger" 
        onClick={() => setMenuOpen(!menuOpen)} 
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Мобильное вертикальное меню */}
      <ul className={`burger-nav ${menuOpen ? 'active' : ''}`}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href || '#'} 
              onClick={(e) => handleClick(link, e)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BurgerMenu;