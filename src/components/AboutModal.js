// src/components/AboutModal.js
import React from 'react';

function AboutModal({ onClose }) {
  return (
    <div className="modal-content">
      <h2>О нас</h2>
      <p>Мы компания, занимающаяся продажей различных товаров для дома и сада.</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default AboutModal;
