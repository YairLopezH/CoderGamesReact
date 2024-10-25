import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CartWidget.css';

const CartWidget = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <Link to="/cart" className="cart-widget">
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
    );
};

export default CartWidget;