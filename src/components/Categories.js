import React, { Component } from 'react';

/**
 * Компонент для отображения и управления категориями товаров и сортировкой.
 * @extends {Component}
 */
export class Categories extends Component {
  /**
   * Создает экземпляр Categories.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { key: 'all', name: 'Все' },
        { key: 'tables', name: 'Столы' },
        { key: 'appliances', name: 'Техника' },
        { key: 'carpets', name: 'Ковры' },
        { key: 'tools', name: 'Инструменты' },
        { key: 'light', name: 'Освещение' },
        { key: 'outdoor', name: 'На открытом воздухе' },
        { key: 'garden', name: 'Сад' }
      ],
      sortMode: 'categories', // categories, price, name
      priceSortOrder: 'asc', // asc, desc
      nameSortOrder: 'asc' // asc, desc
    };
  }

  /**
   * Устанавливает режим сортировки и порядок сортировки.
   * @param {string} mode - Режим сортировки ('categories', 'price', 'name').
   */
  setSortMode = (mode) => {
    if (mode === 'price') {
      const newOrder = this.state.priceSortOrder === 'asc' ? 'desc' : 'asc';
      this.setState({ sortMode: mode, priceSortOrder: newOrder });
      this.props.setSortStrategy(mode, newOrder);
    } else if (mode === 'name') {
      const newOrder = this.state.nameSortOrder === 'asc' ? 'desc' : 'asc';
      this.setState({ sortMode: mode, nameSortOrder: newOrder });
      this.props.setSortStrategy(mode, newOrder);
    } else {
      this.setState({ sortMode: mode });
      this.props.setSortStrategy(mode);
    }
  }

  render() {
    const { sortMode, categories, priceSortOrder, nameSortOrder } = this.state;
    const priceArrow = priceSortOrder === 'asc' ? '△' : '▽';
    const nameArrow = nameSortOrder === 'asc' ? '△' : '▽';

    return (
      <div className='categories-list'>
        <div onClick={() => this.setSortMode('categories')} className='cat-button'>По категориям</div>
        <div onClick={() => this.setSortMode('price')} className='price-button'>По цене {priceArrow}</div>
        <div onClick={() => this.setSortMode('name')} className='title-button'>По названию {nameArrow}</div>

        {sortMode === 'categories' && (
          <div className='categories'>
            {categories.map(el => (
              <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Categories;
