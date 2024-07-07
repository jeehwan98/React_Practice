import { useParams, Link } from 'react-router-dom';

function ProductDetailPage() {
    const params = useParams();
    return (
        <>
            <h1 key="product1">Product Details!</h1>
            <p>{params.productId}</p> {/* productId as we chose productId as the identifier for the placeholder */}
            <p><Link to=".." relative="path">Back</Link></p>
        </>
    )
}

export default ProductDetailPage;