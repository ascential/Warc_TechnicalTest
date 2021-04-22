import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProductListView from './components/ProductListView';
import ProductView from  './components/ProductView';


function App() {
  return (
    <>
      <div>
        <header>        
          <h1>Shop</h1>
          <div>
            <Router>
                <Switch>
                  <Route exact path="/">
                    <ProductListView />
                  </Route>
                  <Route path='/product/:id'>
                    <ProductView />
                  </Route>
                  <Route exact path="/products">
                    <ProductListView />
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
