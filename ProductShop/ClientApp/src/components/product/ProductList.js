import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductDataService';
import MessagePanel from '../common/MessagePanel';
import { PageHeading, StyledLink } from '../../global-style';
import { CustomTable } from '../commonStyleComponents/table';
import { StyledImage } from '../commonStyleComponents/image';

const ProductList = () => {
    const [errors, setErrors] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setErrors(['Loading data ...']);
        getProducts().then(async res => {
            if(res.status !== 200) {
                setErrors(['Failed to get products', res.statusText]);                
            } else {     
                const data = await res.json();          
                setErrors([]);                
                setProducts(data);
            }
        }).catch(err => setErrors(['Failed to get products. An error occured', err]));
    }, [ setErrors, setProducts]);

    return (
        <div>
            <PageHeading>Products</PageHeading>
            <hr/>
            <MessagePanel messages={errors} />
            { (errors && errors.length == 0) && <div>
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
                                    <td><StyledImage src={prd.imagePath} alt=''/></td>
                                    <td>
                                        <StyledLink to={`product/${prd.id}`}>EDIT &gt;&gt;</StyledLink>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </CustomTable>
            </div> }
        </div>
    );
}

export default ProductList;