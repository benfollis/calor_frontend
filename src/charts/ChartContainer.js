import React, {useState} from 'react';
import PropTypes from 'prop-types';
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



function ChartContainer(props) {
    const {
        name,
        unit
    } = props;


    const [currentUnit, setCurrentUnit] = useState(unit);

    function getUnitSelect(unit) {
        return (
            <Grid xs={4}
                  item
            >
                <FormControlLabel
                    value={unit}
                    control={<Radio/>}
                    label={unit}
                    onChange={() => setCurrentUnit(unit)}
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
                                value={currentUnit}
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

                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Chart name={name} unit={currentUnit}/>
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