import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const ProductEdit = () => {

  const [ product, setProduct ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ saved, setSaved ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const populateProduct = async () => {
      const response = await fetch(`api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    }
  
    populateProduct();
  }, []);

  const handleTitleChange = (event) => {
    setProduct({...product, title: event.target.value});
  };

  const handleImagePathChange = (event) => {
    setProduct({...product, imagePath: event.target.value});
  };

  const handlePriceChange = (event) => {
    setProduct({...product, price: event.target.value});
  };

  const handleDescriptionChange = (event) => {
    setProduct({...product, description: event.target.value});
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    await fetch('api/products', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    setSaved(true);
  }

  const renderProduct = (product) => {
    return (
      <>
        <h1>Edit product</h1>
        <form onSubmit={handleSubmit}>
          <div className="row form-group">
            <div className="col-md-4">
              <label>{"Id"}</label>
            </div>
            <div className="col-md-8">
              <input type="text" value={product.id} className="form-control" readOnly />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label>{"Title"}</label>
            </div>
            <div className="col-md-8">
              <input type="text" defaultValue={product.title} className="form-control" onChange={handleTitleChange} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label>{"ImagePath"}</label>
            </div>
            <div className="col-md-8">
              <input type="text" defaultValue={product.imagePath} className="form-control" onChange={handleImagePathChange} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label>{"Price"}</label>
            </div>
            <div className="col-md-8">
              <input type="text" defaultValue={product.price} className="form-control" onChange={handlePriceChange} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-4">
              <label>{"Description"}</label>
            </div>
            <div className="col-md-8">
              <input type="text" defaultValue={product.description} className="form-control" onChange={handleDescriptionChange} />
            </div>
          </div>
          <div className="row form-group">
            <input type="submit" value="Save" onSubmit={handleSubmit}/>
          </div>
        </form>
      </>
    );
  }

  const contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderProduct(product)
  );

  if (saved) {
    return <Redirect to={`/products/${id}`} />;
  }

  return <>{contents}</>;
}
