import React, { Component } from 'react';
import Order from './Order';
import InputMask from 'react-input-mask';

/**
 * Функция, возвращающая компонент React, представляющий сообщение о пустой корзине.
 * @returns {Component} Компонент React, отображающий сообщение о пустой корзине.
 */
const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Корзина пуста</h2>
    </div>
  );
};

/**
 * Компонент модального окна оплаты.
 * @extends {Component}
 */
export  class PaymentModal extends Component {
  /**
   * Создает экземпляр PaymentModal.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
      fullName: '',
      paymentMethod: null,
      isPaymentSuccessful: false,
      errorMessage: '',
      bonusPoints: '',
    };
  }

  /**
   * Обработчик изменения способа оплаты.
   * @param {string} method - Выбранный способ оплаты.
   */
  handlePaymentMethodChange = (method) => {
    this.setState({ paymentMethod: method });
  };

  /**
   * Обработчик изменения ввода данных.
   * @param {object} e - Событие изменения ввода.
   */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Обработчик изменения количества бонусных баллов.
   * @param {object} e - Событие изменения ввода.
   */
  handleBonusPointsChange = (e) => {
    this.setState({ bonusPoints: e.target.value });
  };

  /**
   * Обработчик отправки формы оплаты.
   * @param {object} e - Событие отправки формы.
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { paymentMethod, bonusPoints } = this.state;

    if (!paymentMethod) {
      this.setState({ errorMessage: 'Пожалуйста, выберите способ оплаты.' });
      return;
    }

    if (paymentMethod === 'bonuses' && (!bonusPoints || isNaN(bonusPoints) || bonusPoints <= 0)) {
      this.setState({ errorMessage: 'Пожалуйста, введите корректное количество бонусных баллов.' });
      return;
    }

    // Симулируем успешную оплату
    this.setState({ isPaymentSuccessful: true, errorMessage: '' }, () => {
      setTimeout(() => {
        this.props.onClose(); // Закрываем модальное окно
        this.props.onClearCart(); // Очищаем корзину
      }, 2000); // Задержка в 2 секунды перед закрытием модального окна
    });
  };

  /**
   * Вычисляет общую стоимость товаров.
   * @returns {string} Общая стоимость товаров.
   */
  calculateTotal = () => {
    return this.props.itemsForPayment
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(2);
  };

  /**
   * Рендеринг компонента.
   * @returns {JSX.Element} Элемент отображения модального окна оплаты.
   */
  render() {
    const { paymentMethod, isPaymentSuccessful, errorMessage, bonusPoints } = this.state;

    if (isPaymentSuccessful) {
      return (
        <div className="payment-success">
          <h2>Оплата прошла успешно. Спасибо за заказ!</h2>
        </div>
      );
    }

    return (
      <div className="payment-modal-content shop-cart">
        <div className="order-items-container">
          <h3>Товары</h3>
          {this.props.itemsForPayment.length > 0 ? (
            <>
              <div className="order-items">
                {this.props.itemsForPayment.map((item) => (
                  <Order key={item.id} item={item} onDelete={this.props.onDelete} />
                ))}
              </div>
              <div className="total">
                <h3>Общая стоимость: {this.calculateTotal()}$</h3>
              </div>
            </>
          ) : (
            showNothing()
          )}
        </div>
        <div className="payment-form-container">
          <h3>Данные для оплаты</h3>
          <form onSubmit={this.handleSubmit} className="payment-form">
            <div>
              <label>ФИО:</label>
              <input
                type="text"
                name="fullName"
                value={this.state.fullName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label>Адрес:</label>
              <input
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
                required
              />
            </div>
            <h3>Выберите способ оплаты</h3>
            <div className="payment-buttons-method">
              <button type="button" className="button-card" onClick={() => this.handlePaymentMethodChange('card')}>Картой</button>
              <button type="button" className="button-bonus" onClick={() => this.handlePaymentMethodChange('bonuses')}>Бонусами</button>
            </div>

            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="payment-form-information">
                <div>
                  <label>Номер карты:</label>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    maskChar=" "
                    name="cardNumber"
                    value={this.state.cardNumber}
                    onChange={this.handleChange}
                    required
                  >
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                </div>
                <div>
                  <label>Действует до:</label>
                  <InputMask
                    mask="99/99"
                    maskChar=" "
                    name="cardExpiry"
                    value={this.state.cardExpiry}
                    onChange={this.handleChange}
                    required
                  >
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                  </div>
                <div>
                  <label>CVV:</label>
                  <InputMask
                    mask="999"
                    maskChar=" "
                    name="cardCVC"
                    value={this.state.cardCVC}
                    onChange={this.handleChange}
                    required
                  >
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                </div>
              </div>
            )}

            {paymentMethod === 'bonuses' && (
              <div className='bonuses-info'>
                <p>Ваши бонусы: 1000 🎟️</p>
                <input
                  type="number"
                  name="bonusPoints"
                  value={bonusPoints}
                  onChange={this.handleBonusPointsChange}
                  min="1"
                  required
                />
              </div>
            )}
            <div className="payment-buttons">
              <button type="submit" className="button">Оплатить</button>
              <button type="button" className="close-modal-button" onClick={this.props.onClose}>Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default PaymentModal;
               
