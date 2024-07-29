import React from 'react';
import { Link, Head } from '@inertiajs/react';
import ProductsCatalog from '@/Components/ProductsCatalog';

const Welcome = ({ products, availableProductCount, outOfStockProductCount, canLogin, canRegister, auth }) => {
    return (
        <div>
            <Head title="Welcome" />
            <nav className="navbar navbar-expand-lg bg-light shadow-sm">
                <div className="container-fluid col-lg-8 col-md-12 col-12">
                    <Link className="navbar-brand" href="/">EHSAN STORE</Link>
                    <div className="d-flex justify-between">
                        <ul className="navbar-nav ml-auto">
                            {auth ? (
                                <li className="nav-item">
                                    <Link className="nav-link" href="/dashboard">Dashboard</Link>
                                </li>
                            ) : (
                                <>
                                    {canRegister && (
                                        <li className="nav-item btn btn-light fw-bolder me-2">
                                            <Link className="nav-link" href={route('register')}>Register</Link>
                                        </li>
                                    )}
                                    {canLogin && (
                                        <li className="nav-item btn btn-primary fw-bold">
                                            <Link className="nav-link" href={route('login')}>Login</Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Available Products</h5>
                                <p className="card-text">{availableProductCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Out of Stock Products</h5>
                                <p className="card-text">{outOfStockProductCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <ProductsCatalog products={products} />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
