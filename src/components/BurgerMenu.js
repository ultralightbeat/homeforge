import React, { useState } from 'react';

const BurgerMenu = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Десктопное горизонтальное меню */}
      <ul className="header-nav">
        {navLinks.map((link, index) => (
          <li key={index}>{link.title}</li>
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
          <li key={index} onClick={() => setMenuOpen(false)}>
            {link.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BurgerMenu;
