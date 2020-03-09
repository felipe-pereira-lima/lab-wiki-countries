import React from 'react';
import './App.css';
import CountryDetails from './components/CountryDetails';
import countries from './countries.json';
import { Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">
            WikiCountries
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
            <div className="list-group">
              {countries.map(country => {
                return (
                  <Link className="list-group-item list-group-item-action" to={`/${country.cca3}`}>
                    {country.flag} {country.name.common}
                  </Link>
                );
              })}
            </div>
          </div>
          <Switch>
            <Route path="/:country" component={CountryDetails} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
