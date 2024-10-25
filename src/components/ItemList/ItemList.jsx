import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({ products }) => {
    return (
        <div className="item-list-container">
            <div className="item-grid">
                {products.map(product => (
                    <Item key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ItemList;
