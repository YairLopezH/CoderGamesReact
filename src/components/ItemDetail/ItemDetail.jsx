import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css'; 

const ItemDetail = ({ item }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useCart();
    const navigate = useNavigate();

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        addItem(item, quantity);
    };

    return (
        <div className="itemDetail-container">
            <div className="card detail-card">
                <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Precio: ${item.price}</p>
                    <p className="card-text">Stock: {item.stock}</p>
                    
                    {quantityAdded === 0 ? (
                        <ItemCount stock={item.stock} initial={1} onAdd={handleOnAdd} />
                    ) : (
                        <button 
                            className="btn-custom"
                            onClick={() => navigate('/cart')}
                        >
                            Terminar compra
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;