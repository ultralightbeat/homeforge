// src/components/SortingStrategies.js

/**
 * Класс для сортировки элементов по имени.
 * 
 * @class
 */
class SortByName {
  /**
   * Создает новый экземпляр SortByName.
   * 
   * @constructor
   * @param {string} [order='asc'] - Порядок сортировки ('asc' - по возрастанию, 'desc' - по убыванию).
   */
  constructor(order = 'asc') {
    this.order = order;
  }

  /**
   * Сортирует элементы по имени.
   * 
   * @param {Array} items - Массив элементов для сортировки.
   * @returns {Array} Отсортированный массив элементов.
   */
  sort(items) {
    return [...items].sort((a, b) => {
      if (this.order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }
}

/**
 * Класс для сортировки элементов по цене.
 * 
 * @class
 */
class SortByPrice {
  /**
   * Создает новый экземпляр SortByPrice.
   * 
   * @constructor
   * @param {string} [order='asc'] - Порядок сортировки ('asc' - по возрастанию, 'desc' - по убыванию).
   */
  constructor(order = 'asc') {
    this.order = order;
  }

  /**
   * Сортирует элементы по цене.
   * 
   * @param {Array} items - Массив элементов для сортировки.
   * @returns {Array} Отсортированный массив элементов.
   */
  sort(items) {
    return [...items].sort((a, b) => {
      if (this.order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
}

export { SortByName, SortByPrice };
