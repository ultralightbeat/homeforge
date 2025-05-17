import React, { Component } from 'react';

/**
 * Компонент для отображения полной информации о товаре.
 * 
 * @component
 */
export class ShowFullItem extends Component {
  /**
   * Рендеринг компонента.
   * 
   * @returns {JSX.Element} Элемент для отображения полной информации о товаре.
   */
  render() {
    return (
      <div className='full-item'>
        
        <div className='item-details'>

        <div>
          {/* Изображение товара */}
          <img className='item-img' src={"./img/" + this.props.item.img} onClick={() => this.props.onShowItem(this.props.item)} />
        </div>
          <div className='item-details'>
          <h2>{this.props.item.title}</h2>
          {/* Полное описание товара */}
          <p className='item-details'>{this.props.item.detailedDesc}</p>
          <b>{this.props.item.price}₽</b>
          {this.props.item.isWeightItem && (
          <div>
            <label>
              Вес (кг):
              <input
                type="number"
                value={this.props.weight[this.props.item.id] || ''}
                onChange={(e) => this.props.onWeightChange(e, this.props.item.id)}
              />
            </label>
          </div>
        )}
        </div>
          
          {/* Кнопка для добавления товара в корзину */}
          <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
        </div>
      </div>
    );
  }
}

export default ShowFullItem;
