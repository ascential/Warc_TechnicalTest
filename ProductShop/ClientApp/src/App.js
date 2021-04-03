import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductList from './components/product/ProductList';
import Product from  './components/product/Product';
import { GlobalStyle, ApplicationHeading } from './global-style';


function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <header>        
          <ApplicationHeading>Warc Product Shop</ApplicationHeading>
          <div>
            <Router>
                <Switch>
                  <Route exact path="/">
                    <ProductList />
                  </Route>
                  <Route path='/product/:id'>
                    <Product />
                  </Route>
                  <Route exact path="/products">
                    <ProductList />
                  </Route>
                </Switch>
            </Router>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
