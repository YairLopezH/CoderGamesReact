import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: ''
    });

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('El teléfono es requerido');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        if (formData.email !== formData.confirmEmail) {
            setError('Los emails no coinciden');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const order = {
                buyer: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email
                },
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: getTotalPrice(),
                date: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'orders'), order);
            setOrderId(docRef.id);
            clearCart();

            cart.forEach(async item => {
                const itemRef = doc(db, 'items', item.id);
                await updateDoc(itemRef, {
                    stock: item.stock - item.quantity
                });
            });
        } catch (error) {
            setError('Error al procesar la orden. Por favor, intente nuevamente.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="checkout-container">
                <div className="loading-message">
                    <h2>Procesando orden...</h2>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (orderId) {
        return (
            <div className="checkout-container success-container">
                <div className="success-message">
                    <h2>¡Gracias por tu compra!</h2>
                    <p>Tu número de orden es:</p>
                    <p className="order-id">{orderId}</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-form-container">
                <h2 className="text-center mb-4">Checkout</h2>
                {error && <div className="alert alert-danger custom-alert">{error}</div>}
                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control custom-input"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Confirmar Email</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-success checkout-button"
                        disabled={!formData.name || !formData.phone || !formData.email || !formData.confirmEmail}
                    >
                        Finalizar Compra
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;