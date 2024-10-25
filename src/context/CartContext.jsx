import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            const updatedCart = cart.map(prod => {
                if (prod.id === item.id) {
                    return { ...prod, quantity: prod.quantity + quantity };
                }
                return prod;
            });
            setCart(updatedCart);
        }
    };

    const decreaseQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        }).filter(item => item.quantity > 0);
        
        setCart(updatedCart);
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    const getTotalItems = () => {
        let total = 0;
        cart.forEach(prod => {
            total += prod.quantity;
        });
        return total;
    };

    const getTotalPrice = () => {
        let total = 0;
        cart.forEach(prod => {
            total += prod.price * prod.quantity;
        });
        return total;
    };

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            removeItem,
            clearCart,
            isInCart,
            getTotalItems,
            getTotalPrice,
            decreaseQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};