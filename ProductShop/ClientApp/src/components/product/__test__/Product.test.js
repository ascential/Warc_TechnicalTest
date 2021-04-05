import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';
import { getProduct, saveProduct } from '../../services/ProductDataService';
import Product from '../Product';
import { useParams, MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

jest.mock('../../services/ProductDataService', () => ({
  getProduct: jest.fn(),
  saveProduct: jest.fn()
}));



describe('product test', () => {

  beforeEach(() => {
    useParams.mockReturnValue({id: 2}); 
  });

  it('renders snapshot correctly', async () => {
    const cmp = shallow(<Product />);
    expect(cmp).toMatchSnapshot();
  });

  it('renders all product fields with correct data', async () => {
      
    let testData = {
      id: 2,
      title: 'prd 2',
      description: 'desc 2',
      imagePath: 'img path 2',
      price: 100
    };    

    getProduct.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => ({
        success: true,
        errors: [],
        dataState: testData
      })
    }));

    saveProduct.mockImplementation((prd) => Promise.resolve({
      status: 200,
      json: () => ({
        success: true,
        errors: [],
        dataState: { ...prd }
      })
    }));
    
    let cmp = mount(<MemoryRouter><Product /></MemoryRouter>);

    await act(async () => {
      await Promise.resolve(cmp);
      await new Promise(res => setImmediate(res));      
      cmp.update();
    });

    const title = cmp.find('input[name="title"]');
    const desc = cmp.find('textarea[name="description"]');
    const price = cmp.find('input[name="price"]');

    expect(cmp.find('h1').filterWhere(x => x.html() === `Edit Product : ${testData.id}`)).toBeTruthy();
    expect(cmp.exists({children : `${testData.imagePath}`})).toBeTruthy();    
    expect(title.prop('value')).toBe(testData.title);
    expect(desc.prop('value')).toBe(testData.description);
    expect(price.prop('value')).toBe(testData.price);
  
    const backLink = cmp.find('a[href="/"]');
    expect(backLink).toHaveLength(1);
    expect(backLink.text()).toBe('<< Back to Products');

    const submitBtn = cmp.find('button[type="submit"]');
    expect(submitBtn).toHaveLength(1);    
    expect(submitBtn.text()).toBe('SAVE');

    const newValForDesc = 'new val for desc for item 2';

    await act(async () => {
      desc.type(newValForDesc);
      cmp.update();
      submitBtn.simulate('click');
    });
    
    const newDesc = cmp.find('textarea[name="description"]');
    expect(newDesc.prop('value')).toBe(testData.description);
  });
});

