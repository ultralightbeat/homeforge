import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  const mockProps = {
    orders: [
      { id: 1, name: 'Item 1', price: 100, count: 2 },
      { id: 2, name: 'Item 2', price: 150, count: 1 },
    ],
    onDelete: jest.fn(),
    openPaymentModal: jest.fn(),
  };

  test('renders Header component with correct elements', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByText('House staff')).toBeInTheDocument();
    expect(screen.getByText('О нас')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText('Кабинет')).toBeInTheDocument();
  });

  test('toggles cart display when shopping cart icon is clicked', () => {
    render(<Header {...mockProps} />);

    const cartButton = screen.getByRole('button', { name: /shopping cart/i });
    fireEvent.click(cartButton);

    // Используем функцию для проверки текста
    expect(screen.getByText((content, element) => {
      return content.includes('Сумма: 350.00$');
    })).toBeInTheDocument();

    fireEvent.click(cartButton);

    expect(screen.queryByText((content, element) => {
      return content.includes('Сумма: 350.00$');
    })).not.toBeInTheDocument();
  });

  test('shows empty cart message when there are no orders', () => {
    const emptyProps = { ...mockProps, orders: [] };

    render(<Header {...emptyProps} />);
    const cartButton = screen.getByRole('button', { name: /shopping cart/i });
    fireEvent.click(cartButton);

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });
});
