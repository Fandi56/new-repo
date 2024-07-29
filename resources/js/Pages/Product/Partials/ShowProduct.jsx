import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ProductDetail = ({ product, auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{product.name}</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                {/* Adjust the image source path */}
                                <img src={`/${product.product_image}`} alt={product.name} className="img-fluid" />
                            </div>
                            <div className="col-md-8">
                                <p><strong>Price:</strong> ${product.price}</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className='badge badge-success ms-2 fs-7'>
                                        {product.is_active === 1 ? 'Available' : 'Out of stock'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <Link className="btn btn-primary" href="/dashboard">Back to Products</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductDetail;
