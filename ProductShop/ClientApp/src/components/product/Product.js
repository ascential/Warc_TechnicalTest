import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { getProduct, saveProduct } from '../services/ProductDataService';
import MessagePanel from '../common/MessagePanel';
import { PageHeading, StyledLink, SectionHeading } from '../../global-style';
import { Button } from '../commonStyleComponents/buttons';
import { StyledForm, Input, Caption, LongText, StyledFormFooter } from '../commonStyleComponents/forms';

function Product() {
    const { id } = useParams();
    const [info, setInfo] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {        
        getProduct(id).then(async res => {
            if(res.status !== 200) {
                setInfo(['Failed to get the product', res.statusText]);                
            } else {     
                const jsonRes = await res.json();   
                if(jsonRes?.success) { 
                    const data = jsonRes.dataState;                      
                    setProduct(data);
                } else {
                    setInfo(...jsonRes?.errors);
                }
            }
        })
    }, [ setInfo, setProduct, id]);

    const updateProduct = (key, value) => {
        if(product) {
            const udpatedPrd = {...product, [key]: value};
            setProduct(udpatedPrd);
        }

        if(info && info.length !== 0) {
            setInfo([]);
        }
    };

    const save = () => {
        if(product?.id) {
            saveProduct(product).then(async res => {
                if(res.status !== 200) {
                    setInfo(['Failed to save the product', res.statusText]);                
                } else {     
                    const jsonRes = await res.json();   
                    if(jsonRes?.success) {                                      
                        setInfo(['1 product updated']);
                    } else {
                        setInfo(...jsonRes?.errors);
                    }
                }
            })
        }
    };

    return (
        <div>
            <PageHeading> Edit Product</PageHeading>
            <hr/>
            <SectionHeading>Product Id : { id }</SectionHeading>
            <MessagePanel messages={info} />
            <StyledForm>
                <fieldset>
                    <Caption>Title</Caption>
                    <Input type='text' minLength='1' 
                        id='title' value={product?.title} 
                        onChange={(event) => updateProduct('title', event.target.value )} />
                </fieldset>
                <fieldset>
                    <Caption>Description</Caption>
                    <LongText type='text' minLength='5' 
                        id='description' value={product?.description} 
                        onChange={(event) => updateProduct('description', event.target.value)} />
                </fieldset>
                <fieldset>
                    <Caption>Price</Caption>
                    <Input type='number' minLength='5' 
                        id='price' value={product?.price} 
                        onChange={(event) => updateProduct('price', event.target.value )} />
                </fieldset>
                <fieldset>
                    <Caption>Image Path</Caption>
                    <Caption>{ product?.imagePath }</Caption>
                </fieldset>
                <hr/>
                <StyledFormFooter>
                    <StyledLink to='/'>&lt;&lt; Back to Products</StyledLink>
                    <Button type='submit' onClick={save}>SAVE</Button>
                </StyledFormFooter>
            </StyledForm>
        </div>
    );
}

export default Product;