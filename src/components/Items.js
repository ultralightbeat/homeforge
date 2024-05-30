import React, { Component } from 'react';
import Item from './Item';

/**
 * Класс компонента для отображения списка товаров.
 * @extends Component
 */
export class Items extends Component {
  /**
   * Создает экземпляр Items.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Рендеринг компонента.
   * @returns {JSX.Element} Элемент отображения списка товаров.
   */
  render() {
    return (
      <main>
        {this.props.items.map(el => (
          <Item onShowItem={this.props.onShowItem} key={el.id} item={el} onAdd={this.props.onAdd} />
        ))}
      </main>
    );
  }
}

export default Items;
