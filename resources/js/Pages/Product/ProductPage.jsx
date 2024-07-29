import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductTable from './Table/ProductTable';

export default function Product({ auth, products, success, error }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
        >
            <Head title="Product" />

            <div className="py-12">
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="container">
                    <ProductTable products={products} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
