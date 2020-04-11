import React from 'react';
import './App.css';
import {ServerProvider} from "./ServerContext";
import ServerUrlInput from "./ServerUrlInput";
import ChartScreen from "./charts/ChartScreen";

function App() {

    return (
        <div className="App">
            <ServerProvider>
                    <ServerUrlInput/>
                    <ChartScreen/>
            </ServerProvider>
        </div>
    );
}

export default App;
