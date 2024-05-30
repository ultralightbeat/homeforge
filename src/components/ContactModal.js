import React from 'react';

const ContactModal = ({ onClose }) => (
  <div className="modal-content">
    <h2>Контакты</h2>
    <p>Здесь будут наши контактные данные.</p>
    <button type="button" className="close-modal-button" onClick={this.props.onClose}>Закрыть</button>
  </div>
);

export default ContactModal;
