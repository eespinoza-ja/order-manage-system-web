import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/index';
import Products from './pages/products';
import Orders from './pages/orders';
import Order from './pages/order';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/orders' component={Orders} />
            <Route path='/products' component={Products} />
            <Route path='/Order' component={Order} />
        </Switch>
    </Router>
  );
}

export default App;