import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Pagination from '@/Components/Pagination';

const ProductTable = ({ products = [] }) => {
    const [productList, setProductList] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15); // Number of products per page

    useEffect(() => {
        if (Array.isArray(products)) {
            setProductList(products); // Initialize product list
        }
    }, [products]);

    // Function to handle product deletion
    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Konfirmasi Hapus Produk',
            text: 'Produk yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batalkan',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`product/${productId}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Berhasil Menghapus Produk', 'success');
                        setProductList((prevProducts) =>
                            prevProducts.filter((product) => product.id !== productId)
                        );
                    })
                    .catch(err => {
                        Swal.fire('Error!', 'Failed to delete product.', 'error');
                        console.error('Delete error:', err);
                    });
            }
        });
    };

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Function to get filtered products based on search term
    const filteredProducts = Array.isArray(productList)
        ? productList.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="row">
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Link className="btn btn-primary" href="/product/create">
                    <span>Tambah Produk</span>
                </Link>
            </div>
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Aksi</th>
                            <th>Gambar Produk</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stok</th>
                            <th className="w-25">Deskripsi Produk</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{indexOfFirstProduct + index + 1}</td>
                                <td className='d-flex justify-content-around align-items-center'>
                                    <Link className="btn btn-warning btn-sm" href={`/product/${product.id}/edit`}>
                                        <span>Edit</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                                <td>
                                    <img src={product.product_image} alt={product.name} width="50" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.description}</td>
                                <td>
                                    <span className={`badge ${product.is_active === 1 ? 'badge-success' : 'badge-danger'}`}>
                                        {product.is_active === 1 ? 'AKTIF' : 'NON AKTIF'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-center align-items-center mt-3'>
            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                onPageChange={paginate}
                />
                </div>
        </div>
    );
};

export default ProductTable;
