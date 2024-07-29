import React, { useState, useEffect } from 'react';
import ProductCard from '@/Pages/Product/ProductCard';
import Pagination from '@/Components/Pagination';

const ProductsCatalog = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12); // Customize the number of products per page

    useEffect(() => {
        // This effect can optionally handle any side-effects related to the products list,
        // but since you've dumped all data from the backend, it may not be necessary.
        // You might perform some initialization or logging here.
    }, [products]); // Dependency array might need adjustment based on real use-case

    // Calculate the index range for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages based on total products and products per page
    const totalPages = Math.ceil(products.length / productsPerPage) || 1;

    return (
        <div>
            <div className="row">
                {currentProducts.map((product) => (
                    <div key={product.id} className="col-md-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ProductsCatalog;
