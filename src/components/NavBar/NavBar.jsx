import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import './NavBar.css';

const NavBar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const itemsCollection = collection(db, 'items');
                const itemsSnapshot = await getDocs(itemsCollection);
                const uniqueCategories = [...new Set(
                    itemsSnapshot.docs.map(doc => doc.data().categoryId)
                )];
                const categoriesList = uniqueCategories.map(category => ({
                    id: category,
                    name: category.charAt(0).toUpperCase() + category.slice(1)
                }));
                setCategories(categoriesList);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        getCategories();
    }, []);

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <i className="fas fa-gamepad me-2"></i>
                    CoderGames
                </Link>

                <div className="categories-container">
                    {categories.map(cat => (
                        <Link 
                            key={cat.id}
                            to={`/category/${cat.id}`} 
                            className="category-button"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
                
                <div className="cart-container">
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;