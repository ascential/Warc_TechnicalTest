import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductDataService';
import MessagePanel from '../common/MessagePanel';
import { PageHeading, StyledLink } from '../../global-style';
import { CustomTable } from '../commonStyleComponents/table';

const ProductList = () => {
    const [errors, setErrors] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(async res => {
            if(res.status !== 200) {
                setErrors(['Failed to get products', res.statusText]);                
            } else {     
                const data = await res.json();          
                console.log(res);
                setProducts(data);
            }
        })
    }, [ setErrors, setProducts]);

    return (
        <div>
            <PageHeading>Products</PageHeading>
            <hr/>
            <MessagePanel messages={errors} />
            <div>
                <CustomTable>
                    <thead>
                        <tr>
                            <td>Product Id</td>
                            <td>Price</td>
                            <td>Title</td>
                            <td>Description</td>
                            <td colSpan='2'></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prd, index) => {
                            return (
                                <tr key={prd.id}>
                                    <td>{prd.id}</td>
                                    <td>{prd.price}</td>
                                    <td>{prd.title}</td>
                                    <td>{prd.description}</td>
                                    <td><img src={prd.imagePath} alt=''/></td>
                                    <td>
                                        <StyledLink to={`product/${prd.id}`}>Edit &gt;&gt;</StyledLink>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </CustomTable>
            </div>
        </div>
    );
}

export default ProductList;