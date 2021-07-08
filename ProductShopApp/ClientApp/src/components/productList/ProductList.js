import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_FOR_FRONTEND_HOST } from "../../Constants";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const populateProducts = async () => {
      const response = await fetch("api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    populateProducts();
  }, []);

  const renderProducts = (products) => {
    return (
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <h2>{product.title}</h2>
            <img className="product-image" src={`${BACKEND_FOR_FRONTEND_HOST}${product.imagePath}`} alt={product.title} />
            <div className="price">
              <span className="price-tag">Price: </span>
              {product.price}
            </div>
            <Link className="row form-group" to={`/products/${product.id}`}>
              <button className="btn btn-default" type="button">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderProducts(products)
  );

  return (
    <>
      <div class="jumbotron">
        <h1>Product Shop</h1>
        <p>The best place to buy products</p>
      </div>
      {contents}
    </>
  );
};
