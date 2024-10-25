import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id) {
                    throw new Error('ID de producto no válido');
                }

                const productRef = doc(db, 'items', id);
                const productSnapshot = await getDoc(productRef);
                
                if (!productSnapshot.exists()) {
                    throw new Error('Producto no encontrado');
                }

                setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                setError(error.message || 'Error al cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>¡Ups! Algo salió mal</h2>
                <p>{error}</p>
                <button 
                    className="btn btn-primary"
                    onClick={handleGoBack}
                >
                    Volver atrás
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="not-found-container">
                <h2>Producto no encontrado</h2>
                <p>El producto que estás buscando no existe.</p>
                <button 
                    className="btn btn-primary"
                    onClick={handleGoBack}
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="item-detail-container">
            <ItemDetail item={product} />
        </div>
    );
};

export default ItemDetailContainer;