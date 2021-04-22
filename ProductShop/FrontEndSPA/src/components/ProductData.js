import config from '../config';


/**
 * adds or updates the product
 */
export const saveProduct = async (dto) => {    
  const uri = `${config.REACT_APP_API_BASE_URI}/api/product/save`;
  const res = await fetch(uri, {
      method: 'post',        
      headers: {
        'Content-Type': 'application/json',
      },        
      body: JSON.stringify(dto)
    });
    
  return res;
}


/**
 * @returns Returns single product by id
 */
export const loadProduct = async (id) => {    
    const uri = `${config.REACT_APP_API_BASE_URI}/api/product/${id}`;
    const res = await fetch(uri);
    return res;
}

/**
 * @returns Returns list of products
 */
export const getProducts = async () => {
  const uri = `${config.REACT_APP_API_BASE_URI}/api/product/all`;
  const res = await fetch(uri);
  return res;
}

