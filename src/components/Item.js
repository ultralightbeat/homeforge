import React, { Component } from 'react';

/**
 * Класс компонента для отображения отдельного товара.
 * @extends Component
 */
export class Item extends Component {
  /**
   * Создает экземпляр Item.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Рендеринг компонента.
   * @returns {JSX.Element} Элемент отображения товара.
   */
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.img} onClick={() => this.props.onShowItem(this.props.item)} />
        <h2>{this.props.item.title}</h2>
        <p>{this.props.item.desc}</p>
        <b>{this.props.item.price}$</b>
        <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
      </div>
    );
  }
}

export default Item;
