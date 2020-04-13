import React, {useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Card,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
} from "@material-ui/core";
import Chart from "./Chart";
import TimePeriodSelector from "./TimePeriodSelector";
import {getLocalStorageItem, setLocalStorageItem} from "./utils/storageFunction";


function reducer(state, action) {
    switch (action.action) {
        case 'PERIOD':
            return {
                ...state,
                period: action.period,
            };
        case 'UNIT':
            return {
                ...state,
                unit: action.unit,
            };
        default:
            return state;
    }
}


function ChartContainer(props) {
    const {
        name,
        unit
    } = props;

    // the user's previous selections override all
    const loadedValue = getLocalStorageItem(name);
    const initialValue = !_.isEmpty(loadedValue)? loadedValue : {unit: unit, period: '1'};
    const [currentState, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        if (name && currentState) {
            setLocalStorageItem(name, currentState);
        }
    }, [currentState, name]);

    function getUnitSelect(unit) {
        return (
            <Grid xs={4}
                  item
            >
                <FormControlLabel
                    value={unit}
                    control={<Radio/>}
                    label={unit}
                    onChange={() => dispatch({action: 'UNIT', unit})}
                />
            </Grid>
        );
    }

    return (
        <Card>
            <Grid
                container
            >
                <Grid
                    item
                    xs={12}
                >
                    <FormControl
                        component="fieldset"
                    >
                        <FormLabel
                            component="legend"
                        >
                            {name} Temperatures
                        </FormLabel>
                        <RadioGroup
                            value={currentState['unit']}
                        >
                            <Grid
                                container
                                direction="row"
                            >
                                {getUnitSelect('K')}
                                {getUnitSelect('C')}
                                {getUnitSelect('F')}
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                    <TimePeriodSelector
                        value={currentState['period']}
                        onChange={(event) => dispatch({action: 'PERIOD', period: event.target.value})}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Chart
                        name={name}
                        unit={currentState['unit']}
                        period={currentState['period']}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}

ChartContainer.propTypes = {
    unit: PropTypes.string,
};

ChartContainer.defaultProps = {
    unit: 'C',
};

export default ChartContainer;