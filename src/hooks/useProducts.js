import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../utils/storage';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const allProducts = getProducts();
      const allCategories = getCategories();
      
      // Merge category data into each product
      const productsWithCategories = allProducts.map(product => ({
        ...product,
        category: allCategories.find(c => c.id === product.categoryId) || null
      }));
      
      setProducts(productsWithCategories);
      setCategories(allCategories);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const refreshProducts = () => {
    const allProducts = getProducts();
    const allCategories = getCategories();
    
    const productsWithCategories = allProducts.map(product => ({
      ...product,
      category: allCategories.find(c => c.id === product.categoryId) || null
    }));
    
    setProducts(productsWithCategories);
    setCategories(allCategories);
  };

  return { products, categories, loading, refreshProducts };
};
