import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts } from './ProductData';
import './product.css';

const ProductListView = () => {    
    const [prod, setProd] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {        
        getProducts().then(async res => {
            if(res.status !== 200) {
                setErrors(['Failed to get prod', res.statusText]);                
            } else {     
                const data = await res.json();          
                setErrors([]);                
                setProd(data);
            }
        }).catch(err => setErrors(['Failed to get prod. An error occured', err]));
    }, [ setErrors, setProd]);

    return (
        <div>
            <h2>View Products</h2>
            {(errors && errors.length !== 0) &&
                <div className="err">
                    <ul>
                        {errors.map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                </div>
            }  
            <hr/>
            { (errors && errors.length == 0) && <div>
                <table>
                    <thead>
                        <tr>
                            <td colspan='2'></td>
                            <td>Product Id</td>                            
                            <td>Title</td>
                            <td>Description</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {prod.map((prd, index) => {
                            return (
                                <tr key={prd.id}>
                                    <td>
                                        <Link to={`product/${prd.id}`}>[Edit]</Link>
                                    </td>
                                    <td><img src={prd.imagePath} alt=''/></td>
                                    <td>{prd.id}</td>    
                                    <td>{prd.title}</td>
                                    <td>{prd.description}</td>
                                    <td>{prd.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> }
        </div>
    );
}

export default ProductListView;