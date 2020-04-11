import React, {useContext, useEffect, useState} from 'react';
import {ServerContext} from "../ServerContext";
import _ from "lodash";
import {discover} from "../api/calor";
import ChartContainer from "./ChartContainer";


function ChartScreen(props) {

        const [calorUrl] = useContext(ServerContext);
    const [thermometers, setThermometers] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(calorUrl)) {
            console.log(calorUrl);
            discover(calorUrl)
                .then((therms) => {
                    setThermometers(therms);
                });
        }
    }, [calorUrl, setThermometers]);

    function getCharts() {
        return thermometers.map((thermometer) => {
            return (
                <ChartContainer
                    name={thermometer}
                    key={thermometer}
                />
            );
        });
    }

    return (
        <div>
            {getCharts()}
        </div>
    )
}

export default ChartScreen;