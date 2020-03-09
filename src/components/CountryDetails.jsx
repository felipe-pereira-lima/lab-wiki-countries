import React, { Component } from 'react';
import CountryData from './../countries.json';
import { Link } from 'react-router-dom';

export class CountryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      capital: '',
      area: '',
      borders: []
    };
    //this.fetchData = this.fetchData.bind(this); - não precisa disso aqui porque já está dentro da classe!
  }

  fetchData() {
    const contr = this.props.match.params.country;
    CountryData.map(country => {
      if (country.cca3 === contr) {
        this.setState({
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          borders: country.borders
        });
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  convertToCountry(abrv) {
    const country = CountryData.find(country => country.cca3 === abrv);
    if (!country) return;
    return country.name.common;
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    const prevParam = prevProp.match.params.country;
    const actParam = this.props.match.params.country;
    if (actParam !== prevParam) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div className="col-7">
        <h1>{this.state.name}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>Capital</td>
              <td>{this.state.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {this.state.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {this.state.borders.map(country => {
                    return (
                      <li key={country}>
                        <Link to={`/${country}`}>{this.convertToCountry(country)}</Link>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryDetails;
