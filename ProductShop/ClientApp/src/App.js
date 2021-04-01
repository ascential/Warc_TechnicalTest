import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductList from './components/product/ProductList';
import Product from  './components/product/Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <h3>Warc Product Shop</h3>
        <div>
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>

              <hr />
              <Switch>
                <Route exact path="/">
                  <ProductList />
                </Route>
                <Route path={`product/:productId`}>
                  <Product />
                </Route>
                <Route exact path="/products">
                  <ProductList />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
