import React from 'react';
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '../../../Components/InputLabel';
import InputError from '../../../Components/InputError';

export default function EditProduct({ auth, product }) {
    const { data, setData, post, errors } = useForm({
        name: product.name,
        stock: product.stock,
        product_image: null,
        price: product.price,
        description: product.description,
        is_active: product.is_active ? "1" : "0",
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("product.update", product.id), {
            forceFormData: true, // Ensures form data is sent as FormData
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product</h2>}
        >
            <Head title="Edit Product" />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <form
                            onSubmit={handleSubmit}
                            className="card shadow"
                            encType="multipart/form-data"
                        >
                            <div className="card-body">
                                <div className="mb-3">
                                    <InputLabel htmlFor="name">Name:</InputLabel>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="stock">Stock:</InputLabel>
                                    <input
                                        type="number"
                                        id="stock"
                                        name="stock"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                    />
                                    <InputError message={errors.stock} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="product_image">Image:</InputLabel>
                                    <input
                                        type="file"
                                        id="product_image"
                                        name="product_image"
                                        onChange={(e) => setData('product_image', e.target.files[0])}
                                        className={`form-control ${errors.product_image ? 'is-invalid' : ''}`}
                                        accept="image/*"
                                    />
                                    <InputError message={errors.product_image} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="price">Price:</InputLabel>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    />
                                    <InputError message={errors.price} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="description">Description:</InputLabel>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="row mb-10">
                                    <label className="required fw-semibold fs-6 mb-2" htmlFor="checkbox-container">
                                        Status
                                    </label>

                                    <div className="d-flex flex-wrap" name="checkbox-container">
                                        <label className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-4 me-2 status-label ${data.is_active === "1" ? "active" : ""}`}>
                                            <div className="d-flex align-items-center me-2">
                                                <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                                                    <input
                                                        className="form-check-input status-radio"
                                                        type="radio"
                                                        name="is_active"
                                                        value="1"
                                                        checked={data.is_active === "1"}
                                                        onChange={(e) => setData('is_active', e.target.value)}
                                                    />
                                                </div>
                                                <span>Aktif</span>
                                            </div>
                                        </label>

                                        <label className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex flex-stack text-start p-4 status-label ${data.is_active === "0" ? "active" : ""}`}>
                                            <div className="d-flex align-items-center me-2">
                                                <div className="form-check form-check-custom form-check-solid form-check-primary me-6">
                                                    <input
                                                        className="form-check-input status-radio"
                                                        type="radio"
                                                        name="is_active"
                                                        value="0"
                                                        checked={data.is_active === "0"}
                                                        onChange={(e) => setData('is_active', e.target.value)}
                                                    />
                                                </div>
                                                <span>Non Aktif</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
