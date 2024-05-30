import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Items } from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import PaymentModal from "./components/PaymentModal";
import CartManager from "./components/CartManager";
import { SortByName, SortByPrice } from "./components/SortingStrategies";

/**
 * Основной компонент приложения.
 * @extends React.Component
 */
class App extends React.Component {
  /**
   * Создаёт экземпляр App.
   * @param {object} props - Свойства, переданные компоненту.
   */
  constructor(props) {
    super(props);

    /** @type {Array<object>} */
    const storedCart = localStorage.getItem('cart');

    /** @type {object} */
    this.state = {
      orders: storedCart ? JSON.parse(storedCart) : [],
      currentItems: [],
      items: [
        // Пример элемента
        {
          id: 1,
          title: "Деревянный стол",
          img: "table1.webp",
          desc: "Стол на 4-6 персон из массива акации, натурального материала с естественными вариациями рисунка и цвета",
          category: "tables",
          price: "56.49",
          detailedDesc: "Прочный и стильный стол который идеально подходит для использования во дворе или на террасе. Он выполнен из высококачественной древесины акации, что делает его прочным и долговечным. Стол имеет простой и современный дизайн и легко вписывается в любой садовый ландшафт."
        },
        {
          id: 2,
          title: "Ковер Персиск Белудж",
          img: "carpet.png",
          desc: "Ковер ручной работы с персидским орнаментом из длинноволокнистой шерсти",
          category: "carpets",
          price: "135.04",
          detailedDesc: "Ковер сделан мастерами в персидском стиле и представляет собой уникальное произведение искусства. Изготовлен из высококачественной шерсти, он обеспечивает мягкость и комфорт при ходьбе. С персидским орнаментом он станет элегантным дополнением к вашему интерьеру."
        },
        {
          id: 3,
          title: "Гриль для барбекю",
          img: "grill.jpg",
          desc: "Передвижной мангал, который включает в себя основные возможности стационарных мангалов",
          category: "appliances",
          price: "35.99",
          detailedDesc: "Портативный гриль идеально подходит для пикников, кемпинга и других мероприятий на свежем воздухе. Он легко переносится благодаря своим компактным размерам, но при этом предлагает все возможности стационарных мангалов. Высококачественные материалы и прочная конструкция обеспечивают долговечность и надежность гриля."
        },
        {
          id: 4,
          title: "Садовый кусторез",
          img: "scissors.jpg",
          desc: "Инструмент для быстрой обрезки веток и подравнивания кустарников",
          category: "tools",
          price: "5.90",
          detailedDesc: "Отличное решение для ухода за вашим садом. Их острые лезвия обеспечивают чистый и аккуратный срез, а удобные рукоятки делают их легкими в использовании. Идеальны для обрезки веток и формирования кустарников."
        },
        {
          id: 5,
          title: "Светильник",
          img: "svetilnik.jpg",
          desc: "Практичное решение для уличного освещения в винтажном стиле",
          category: "light",
          price: "10.99",
          detailedDesc: "Данный стильный светильник добавит элегантность и атмосферу ретро в ваш сад или на террасу. Он обеспечивает яркое и приятное освещение, создавая уютную атмосферу. Его уникальный дизайн и прочная конструкция делают его идеальным выбором для уличного освещения."
        },
        {
          id: 6,
          title: "Гамак",
          img: "hammock.jpg",
          desc: "Удобный гамак для отдыха на природе",
          category: "outdoor",
          price: "29.99",
          detailedDesc: "Уютный гамак станет идеальным спутником для вашего отдыха на природе. Он легкий и компактный, легко устанавливается и складывается, что делает его идеальным выбором для кемпинга, пикника или просто для отдыха во дворе.",
        },
        {
          id: 7,
          title: "Пикник-корзина",
          img: "picnic-basket.webp",
          desc: "Корзина с пикник-принадлежностями для приятного времяпрепровождения на свежем воздухе",
          category: "outdoor",
          price: "39.99",
          detailedDesc: "Все необходимое для приятного времяпрепровождения на свежем воздухе. В комплекте вы найдете посуду, столовые приборы и прочие удобства, чтобы создать атмосферу уюта и комфорта во время пикника.",
        },
        {
          id: 8,
          title: "Складной стул",
          img: "folding-chair.jpg",
          desc: "Удобный складной стул для отдыха на природе",
          category: "outdoor",
          price: "19.99",
          detailedDesc: "Легкий и компактный стул, легко переносится и складывается в удобную сумку для транспортировки. Идеальный выбор для кемпинга, пикника или рыбалки.",
        },
        {
          id: 9,
          title: "Подставка для цветов",
          img: "flower-stand.webp",
          desc: "Декоративная подставка для выращивания цветов и растений",
          category: "garden",
          price: "24.99",
          detailedDesc: "Эта декоративная подставка станет не только практичным решением для размещения цветов и растений, но и добавит изюминку в ваш ландшафтный дизайн.",
        },
        {
          id: 10,
          title: "Садовая лопата",
          img: "garden-shovel.jpg",
          desc: "Прочная и удобная лопата для работ в саду и на огороде",
          category: "tools",
          price: "17.99",
          detailedDesc: "Благодаря этой садовой лопате вы сможете привести свой сад в порядок без лишних усилий. Эргономичный дизайн и легкий вес инструмента сделают работу комфортной и приятной.",
        },
        {
          id: 11,
          title: "Топор",
          img: "axe2.jpg",
          desc: "Мощный топор для раскола дров",
          category: "tools",
          price: "34.99",
          detailedDesc: "С этим топором, оснащенным прочным стальным лезвием и удобной ручкой, вы справитесь с любой задачей легко и быстро. Идеальный инструмент для дачи, сада или кемпинга.",
        },
        {
          id: 12,
          title: "Ножовка по металлу",
          img: "hacksaw.webp",
          desc: "Инструмент для резки металлических изделий",
          category: "tools",
          price: "15.99",
          detailedDesc: "Ножовка по металлу с прочной стальной рамой и эргономичной рукояткой позволит вам с легкостью пилить трубы, листы металла и другие материалы."
        }
      ],
      showFullItem: false,
      fullItem: {},
      isPaymentModalOpen: false,
      isAboutModalOpen: false,
      isContactModalOpen: false,
      selectedItemsForPayment: [],
      sortStrategy: new SortByName()
    }
    this.state.currentItems = this.state.items;

    // Привязка методов
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
    this.closePaymentModal = this.closePaymentModal.bind(this);
    this.setSortStrategy = this.setSortStrategy.bind(this);
  }

  /**
   * Вызывается после монтирования компонента.
   */
  componentDidMount() {
    const storedCart = CartManager.getOrders();
    this.setState({ orders: storedCart });
  }

  /**
   * Вызывается после обновления компонента.
   * @param {object} prevProps - Предыдущие свойства компонента.
   * @param {object} prevState - Предыдущее состояние компонента.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.orders !== this.state.orders) {
      CartManager.setOrders(this.state.orders);
    }

    if (prevState.sortStrategy !== this.state.sortStrategy) {
      this.setState({ currentItems: this.state.sortStrategy.sort(this.state.currentItems) });
    }
  }

  /**
   * Вызывается перед размонтированием компонента.
   */
  componentWillUnmount() {
    CartManager.setOrders(this.state.orders);
  }

  /**
   * Устанавливает стратегию сортировки.
   * @param {string} strategy - Название стратегии сортировки ('name' или 'price').
   * @param {string} [order='asc'] - Порядок сортировки ('asc' или 'desc').
   */
  setSortStrategy(strategy, order = 'asc') {
    let newStrategy;
    switch (strategy) {
      case 'name':
        newStrategy = new SortByName(order);
        break;
      case 'price':
        newStrategy = new SortByPrice(order);
        break;
      default:
        newStrategy = new SortByName();
    }
    this.setState({ sortStrategy: newStrategy, currentItems: newStrategy.sort(this.state.currentItems) });
  }

  /**
   * Открывает модальное окно оплаты.
   * @param {Array<object>} orders - Заказы для оплаты.
   */
  openPaymentModal = (orders) => {
    this.setState({
      isPaymentModalOpen: true,
      selectedItemsForPayment: orders
    });
  }

  /**
   * Закрывает модальное окно оплаты.
   */
  closePaymentModal() {
    this.setState({ isPaymentModalOpen: false });
  }

  /**
   * Отображает подробную информацию о товаре.
   * @param {object} item - Элемент для отображения.
   */
  onShowItem(item) {
    this.setState({ fullItem: item, showFullItem: !this.state.showFullItem });
  }

  /**
   * Выбирает категорию товаров для отображения.
   * @param {string} category - Выбранная категория.
   */
  chooseCategory(category) {
    let filteredItems;
    if (category === "all") {
      filteredItems = this.state.items;
    } else {
      filteredItems = this.state.items.filter(el => el.category === category);
    }
    this.setState({ currentItems: this.state.sortStrategy.sort(filteredItems) });
  }

  /**
   * Удаляет заказ по его идентификатору.
   * @param {number} id - Идентификатор заказа.
   */
  deleteOrder(id) {
    CartManager.deleteOrder(id);
    this.setState({ orders: CartManager.getOrders() });
  }

  /**
   * Добавляет элемент в заказы.
   * @param {object} item - Элемент для добавления.
   */
  addToOrder(item) {
    CartManager.addOrder(item);
    this.setState({ orders: CartManager.getOrders() });
  }

  /**
   * Очищает корзину заказов.
   */
  handleClearCart = () => {
    CartManager.clearOrders();
    this.setState({ orders: [] });
  };

  /**
   * Отображает компонент.
   * @returns {React.Element} Компонент App.
   */
  render() {
    return (
      <div className="wrapper">
        <Header 
          orders={this.state.orders} 
          onDelete={this.deleteOrder} 
          openPaymentModal={this.openPaymentModal} 
        />
        <Categories 
          chooseCategory={this.chooseCategory} 
          setSortStrategy={this.setSortStrategy}
        />
        <Items 
          onShowItem={this.onShowItem} 
          items={this.state.currentItems} 
          onAdd={this.addToOrder} 
        />
        {this.state.showFullItem && 
          <ShowFullItem 
            onAdd={this.addToOrder} 
            onShowItem={this.onShowItem} 
            item={this.state.fullItem} 
          />}
        <Footer />

        {this.state.isPaymentModalOpen && (
          <div className="payment-modal-overlay">
            <div className="payment-modal">
              <PaymentModal 
                itemsForPayment={this.state.orders}
                onClose={this.closePaymentModal}
                onDelete={this.deleteOrder}
                onClearCart={this.handleClearCart} 
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
