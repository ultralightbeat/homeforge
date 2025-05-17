import React, { Component } from 'react';

/**
 * Класс компонента для отображения отдельного товара.
 * @extends Component
 */
export class Item extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { item, onAdd } = this.props;
    if (item.isWeightItem) {
      const total = parseFloat(item.price) * 0.2;
      onAdd({ ...item, total });
    } else {
      onAdd(item);
    }
  }

  render() {
    const { item, onShowItem } = this.props;
    return (
      <div className="item">
        <img
          src={"./img/" + item.img}
          onClick={() => onShowItem(item)}
          alt={item.title}
        />
        <h2>{item.title}</h2>
        <p>{item.desc}</p>
        <b>{item.price}₽</b>
        <div className="add-to-cart" onClick={this.handleAdd}>
          +
        </div>
      </div>
    );
  }
}

export default Item;
