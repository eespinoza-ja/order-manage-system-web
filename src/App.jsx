import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/index';
import Products from './pages/products';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path='/products' component={Products} />
        </Switch>
    </Router>
  );
}

export default App;