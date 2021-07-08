import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProductView = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const populateProduct = async () => {
      const response = await fetch(`api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    populateProduct();
  }, []);

  const renderProduct = (product) => {
    return (
      <div className="row">
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <img className="product-image" src={product.imagePath} alt={product.title} />
          <div className="price">
            <span className="price-tag">Price: </span>
            {product.price}
          </div>
          <Link className="row form-group" to={`/products/edit/${product.id}`}>
            <button className="btn btn-default" type="button">
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderProduct(product)
  );

  return <>{contents}</>;
};
