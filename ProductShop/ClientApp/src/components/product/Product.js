import { useParams } from "react-router";

function Product() {
    const { productId } = useParams();

    return (
        <div>
            <p>Product Id : { productId }</p>
        </div>
    );
}

export default Product;