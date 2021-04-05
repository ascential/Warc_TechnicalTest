import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';
import { getProducts } from '../../services/ProductDataService';
import ProductList from '../ProductList';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/ProductDataService', () => ({
  getProducts: jest.fn()
}));


describe('product test', () => {

  it('renders snapshot correctly', async () => {
    const cmp = shallow(<ProductList />);
    expect(cmp).toMatchSnapshot();
  });

  it('renders all products returned from getProduct correctly', async () => {
      
    let testData = [{
        id: 1,
        title: 'prd 1',
        description: 'desc 1',
        imagePath: 'img path 1',
        price: 100
      },
      {
        id: 2,
        title: 'prd 2',
        description: 'desc 2',
        imagePath: 'img path 2',
        price: 200
      },
      {
        id: 3,
        title: 'prd 3',
        description: 'desc 3',
        imagePath: 'img path 3',
        price: 300
    }];    

    getProducts.mockReturnValue(Promise.resolve({
      status: 200,
      json: () => testData
    }));

    let cmp = mount(<MemoryRouter><ProductList /></MemoryRouter>);

    await act(async () => {
      await Promise.resolve(cmp);
      await new Promise(res => setImmediate(res));      
      cmp.update();
    });

    expect(cmp.find('h1').filterWhere(x => x.html() === `Products`)).toBeTruthy();

    var allColumnHeaders = [ 
      <td>Product Id</td>, 
      <td>Title</td>, 
      <td>Description</td>, 
      <td>Price</td>
    ];    
    expect(cmp.containsAllMatchingElements(allColumnHeaders)).toBeTruthy(); 

    var allIdEls = testData.map(x => <td>{x.id}</td>);    
    expect(cmp.containsAllMatchingElements(allIdEls)).toBeTruthy();     

    var allTitleEls = testData.map(x => <td>{x.title}</td>);        
    expect(cmp.containsAllMatchingElements(allTitleEls)).toBeTruthy(); 

    var allDescEls = testData.map(x => <td>{x.description}</td>);        
    expect(cmp.containsAllMatchingElements(allDescEls)).toBeTruthy();  

    var allPriceEls = testData.map(x => <td>{x.price}</td>);    
    expect(cmp.containsAllMatchingElements(allPriceEls)).toBeTruthy();     

    testData.forEach(x => {
      const prdLink = cmp.find(`a[href="/product/${x.id}"]`);
      expect(prdLink).toHaveLength(1);
      expect(prdLink.text()).toBe('EDIT >>');

      const img = cmp.find(`img[src="${x.imagePath}"]`);
      expect(img).toHaveLength(1);
    });
  });

  it('renders error message on error while fetching data from getProduct', async () => {
      
    let testData = [];    

    getProducts.mockReturnValue(Promise.resolve({
      status: 404,
      json: () => testData
    }));

    let cmp = mount(<MemoryRouter><ProductList /></MemoryRouter>);

    await act(async () => {
      await Promise.resolve(cmp);
      await new Promise(res => setImmediate(res));      
      cmp.update();
    });

    expect(cmp.find('h1').filterWhere(x => x.html() === `Products`)).toBeTruthy();
    expect(cmp.containsMatchingElement(<li>Failed to get products</li>)).toBeTruthy();    
  });


});

