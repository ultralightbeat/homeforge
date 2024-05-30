import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';

/**
 * Класс компонента для отображения отдельного заказа.
 * @extends Component
 */
export class Order extends Component {
  /**
   * Создает экземпляр Order.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Рендеринг компонента.
   * @returns {JSX.Element} Элемент отображения отдельного заказа.
   */
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.img} alt="" />
        <div className="item-details">
          <h2>{this.props.item.title}</h2>
          <div className="item-details">
            <span className="item-price">{this.props.item.price}$</span>
            <span className='count'>x{this.props.item.count}</span>
            <p className="total-price">
              {new Intl.NumberFormat().format((this.props.item.price * this.props.item.count).toFixed(2))}$
            </p>
          </div>
        </div>
        <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id)} />
      </div>
    );
  }
}

export default Order;
