/**
 * Менеджер корзины, реализующий паттерн одиночка для управления заказами.
 */
class CartManager {
  constructor() {
      if (CartManager.instance) {
          return CartManager.instance;
      }

      /**
       * @type {Array<object>}
       * @private
       */
      let orders = JSON.parse(localStorage.getItem('cart')) || [];

      /**
       * Получает текущие заказы.
       * @returns {Array<object>} Массив текущих заказов.
       */
      this.getOrders = function() {
          return orders;
      }

      /**
       * Устанавливает новые заказы и сохраняет их в localStorage.
       * @param {Array<object>} newOrders - Новый массив заказов.
       */
      this.setOrders = function(newOrders) {
          orders = newOrders;
          localStorage.setItem('cart', JSON.stringify(orders));
      }

      /**
       * Добавляет заказ в корзину. Если заказ с таким же ID уже существует, увеличивает его количество.
       * @param {object} order - Заказ, который нужно добавить.
       * @param {number} order.id - ID заказа.
       * @param {number} [order.count=1] - Количество единиц заказа.
       */
      this.addOrder = function(order) {
          const existingOrder = orders.find(item => item.id === order.id);
          if (existingOrder) {
              existingOrder.count += 1;
          } else {
              orders.push({ ...order, count: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(orders));
      }

      /**
       * Удаляет заказ из корзины по ID. Если количество больше 1, уменьшает количество на 1.
       * @param {number} orderId - ID заказа, который нужно удалить.
       */
      this.deleteOrder = function(orderId) {
          const order = orders.find(item => item.id === orderId);
          if (order && order.count > 1) {
              order.count -= 1;
          } else {
              orders = orders.filter(item => item.id !== orderId);
          }
          localStorage.setItem('cart', JSON.stringify(orders));
      }

      /**
       * Очищает все заказы в корзине.
       */
      this.clearOrders = function() {
          orders = [];
          localStorage.setItem('cart', JSON.stringify(orders));
      }

      CartManager.instance = this;
  }
}

const instance = new CartManager();
Object.freeze(instance);

export default instance;
