import { Link } from '@inertiajs/react';

const ProductCard = ({ product }) => {
    return (
        <div className="card mb-3 position-relative">
            <img src={product.product_image} alt={product.name} className="card-img-top" />
            {!product.is_active && (
                <div className="overlay">
                    <div className="text">Out of Stock</div>
                </div>
            )}
            <div className={`card-body ${!product.is_active ? 'disabled' : ''}`}>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                {product.is_active ? (
                    <Link href={`/product/${product.id}`} className="btn btn-primary">
                        View Details
                    </Link>
                ) : (
                    <button className="btn btn-secondary" disabled>
                        Out of Stock
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
