import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ product }) => {
    return (
        <div className="item-card">
            <div className="item-image-container">
                <img src={product.imageUrl} className="item-image" alt={product.name} />
            </div>
            <div className="item-content">
                <h5 className="item-title">{product.name}</h5>
                <p className="item-price">Precio: ${product.price}</p>
                <Link to={`/item/${product.id}`} className="btn btn-custom">
                    Ver detalle
                </Link>
            </div>
        </div>
    );
};

export default Item;