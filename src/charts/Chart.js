import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Reading} from "../proptypesShapes";
import {Line} from "react-chartjs-2";
import {readingsBetween} from "../api/calor";
import {ServerContext} from "../ServerContext";
import _ from 'lodash';

function getChartRange(unit) {
    switch (unit) {
        case 'F':
            return [-0, 130];
        case 'K':
            return [0, 333.16];
        case 'C':
            return [-60, 60];
        default:
            return [-100, 100];
    }
}

const conversionFunctions = {
    'C': {
        'C': (t) => t,
        'K': (t) => t + 273.15,
        'F': (t) => (t * 1.8) + 32

    },
    'F': {
        'F': (t) => t,
        'C': (t) => (t - 32) / 1.8,
        'K': (t) => ((t - 32) / 1.8) + 273.15
    },
    'K': {
        'K': (t) => t,
        'C': (t) => t - 273.15,
        'F': (t) => ((t - 273.15) * 1.8) + 32
    }
};

function convertUnit(reading, outputUnit) {
    const converter = conversionFunctions[reading.Unit][outputUnit];
    const newTemp = converter(reading.Temp);
    return {
        ...reading,
        Temp: newTemp,
        Unit: outputUnit,
    };
}

function formatData(data, unit) {
    const tempConverted = data.map((reading) => convertUnit(reading, unit));
    const timeConverted = tempConverted.map((reading) => {
        return {
            ...reading,
            Time: new Date(reading.Time),
        };
    });
    const chartReady = timeConverted.map(reading => {
        return {
            y: reading.Temp,
            x: reading.Time
        }
    });
    return chartReady;
}

function Chart(props) {
    const {
        name,
        unit, // the desired unit of display
    } = props;

    const [calorUrl] = useContext(ServerContext);
    const [data, setData] = useState([]);
    const [unloaded, setUnloaded] = useState(true);
    useEffect(() => {
        if (_.isEmpty(data) && unloaded && !_.isEmpty(calorUrl) && !_.isEmpty(name)) {
            readingsBetween(calorUrl, name)
                .then((newData) => {
                    console.log(newData);
                    setData(newData)
                });
            setUnloaded(true)
        }
    }, [data, unloaded, calorUrl, name]);

    const label = `${name} Temperatures`;
    const chartFormatted = formatData(data, unit);
    const range = getChartRange(unit);
    const chartOpts = {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                    unit: 'hour'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    min: range[0],
                    max: range[1],
                    stepValue: 2,
                }
            }]
        }
    };

    const chartData = {
        label,
        datasets: [
            {
                spanGaps: false,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartFormatted
            }
        ],
    };

    // The X data on the chart is the times, the y data is the temp
    return (<Line
            data={chartData}
            options={chartOpts}
        />
    )
}

Chart.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(Reading),
    unit: PropTypes.string,
};

Chart.defaultProps = {
    data: [],
    unit: 'C',
};

export default Chart;