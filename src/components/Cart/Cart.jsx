import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, removeItem, clearCart, getTotalPrice, decreaseQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <div className="cart-icon-empty">
                    <i className="fas fa-shopping-cart"></i>
                </div>
                <h2>Tu carrito está vacío</h2>
                <p>¡Agrega algunos productos para comenzar!</p>
                <Link to="/" className="return-button">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Tu Carrito</h1>
            
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="quantity-badge">Cantidad: {item.quantity}</p>
                            <p>Precio unitario: ${item.price}</p>
                            <p>Subtotal: ${item.price * item.quantity}</p>
                            <div className="item-actions">
                                <button 
                                    className="remove-button"
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    <i className="fas fa-minus"></i> Quitar uno
                                </button>
                                <button 
                                    className="remove-button"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <i className="fas fa-trash"></i> Eliminar todos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-summary">
                <h3>Total: ${getTotalPrice()}</h3>
                <div className="cart-buttons">
                    <button 
                        className="clear-cart-button"
                        onClick={() => clearCart()}
                    >
                        Vaciar carrito
                    </button>
                    <Link to="/checkout" className="checkout-button">
                        Finalizar compra
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;