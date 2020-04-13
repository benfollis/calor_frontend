import React from 'react';
import PropTypes from 'prop-types';
import {Select, MenuItem} from "@material-ui/core";

function TimePeriodSelector(props) {

    const {
        value,
        onChange,
    } = props;

    return (
        <Select
            value={value}
            onChange={onChange}
        >
            <MenuItem value={'1'}>
                24 hours
            </MenuItem>
            <MenuItem value={'7'}>
                1 week
            </MenuItem>
            <MenuItem value={'30'}>
                30 days
            </MenuItem>
            <MenuItem value={'365'}>
                1 year
            </MenuItem>
            <MenuItem value={'1825'}>
                5 years
            </MenuItem>
        </Select>
    )
}

TimePeriodSelector.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

TimePeriodSelector.defaultProps = {
    value: '1',
    onChange: () => {
    },
};


export default TimePeriodSelector;