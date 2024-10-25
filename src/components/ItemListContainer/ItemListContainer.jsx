import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'; 

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        const getProducts = async () => {
            try {
                const productsRef = collection(db, 'items');
                const q = categoryId 
                    ? query(productsRef, where('categoryId', '==', categoryId))
                    : productsRef;
                
                const querySnapshot = await getDocs(q);
                const productsAdapted = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsAdapted);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [categoryId]);

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="container">
            <h2 className="page-title">
                {categoryId ? `${categoryId}` : "Todos los Productos"}
            </h2>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;