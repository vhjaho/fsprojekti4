import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  //kysely-muuttuja
  const [query, setQuery] = useState('');
  //rest-api:n tulokset muuttujassa
  const [results, setResults] = useState([]);

  //Nappi1 hae kaikki
  const haeKaikki = (event) => {
    event.preventDefault();
    console.log(event.target);
    apiGet();
  };

  //Nappi2 hae id
  const haeId = (event) => {
    event.preventDefault();
    console.log(event.target);
    apiId(query);
  };

  //Hakee kaikki rest apin avulla
  const apiGet = () => {
    //tehdään ajax-kutsu rest apiin
    fetch("http://localhost:5000/api/getall")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const items = data;
        console.log(data);
        setResults(items)
      });
  };

  //Hakee id:n perusteella elokuvan
  const apiId = (query) => {
    fetch("http://localhost:5000/api/" + query)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const items = data;
        console.log(data);
        setResults([items])
      });
  };

  const MovieArray = (props) => {
    const { data } = props;

    //taulukko näyttää elokuvan otsikon, vuoden ja ohjaajan
    return (
      <div>
        <table className="table table-dark table-striped">
          <thead>
            <tr key={props.id}>
              <th scope="col">Title</th>
              <th scope="col">Year</th>
              <th scope="col">Directors</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr>
                <td key={i}> {item.title} </td>
                <td key={i}> {item.year} </td>
                <td key={i}> {item.directors} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  //hakukenttään syötetään elokuvan id
  //molemmat napit hakevat tietoja rest-api:sta
  //MovieArray-funktio, joka kutsutaan, esittää tiedot
  return (
    <div>
      <h1>Hae elokuvia</h1>
      <div>
        <form onSubmit={haeKaikki}>
          <div className="form-group">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="form-control"
              placeholder="Syötä elokuvan ID"
              name="query"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Hae kaikki
            </button>
            <button type="button" className="btn btn-primary" onClick={haeId}>
              Hae ID
            </button>
          </div>
        </form>
      </div>
      <MovieArray data={results} />
    </div>
  );
};

export default App;
