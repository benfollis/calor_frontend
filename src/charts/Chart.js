import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Reading} from "../proptypesShapes";
import {Line} from "react-chartjs-2";
import {readingsBetween} from "../api/calor";
import {ServerContext} from "../ServerContext";
import _ from 'lodash';
import {convertUnit} from "./utils/conversionFunctions";

function getChartRange(unit) {
    switch (unit) {
        case 'F':
            return [-0, 120];
        case 'K':
            return [0, 333.16];
        case 'C':
            return [-60, 60];
        default:
            return [-100, 100];
    }
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

    const chartFormatted = formatData(data, unit);
    const range = getChartRange(unit);
    const chartOpts = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'linear',
                time: {
                    unit: 'hour'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: `°${unit}`,
                },
                ticks: {
                    beginAtZero: false,
                    min: range[0],
                    max: range[1],
                    maxTicksLimit: 22,
                    stepValue: 0.5,
                }
            }]
        }
    };

    const chartData = {
        datasets: [
            {
                spanGaps: false,
                legend: {
                    display: false,
                },
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
    return (
        <div className="Chart-Container">
            <Line
                mainta
                data={chartData}
                options={chartOpts}
            />
        </div>
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