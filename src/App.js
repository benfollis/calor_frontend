import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {readingsBetween} from "./api/calor";
import Chart from "./charts/Chart";

function App() {

  const calorUrl = 'http://192.168.1.208:8080';
  const [data, setData] = useState();

  useEffect(()=> {
    if (!data) {
      readingsBetween(calorUrl, 'OneWire')
          .then((newData) => {
            console.log(newData);
            setData(newData)
          });
    }
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <Chart name="OneWire" data={data} unit='F'/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
