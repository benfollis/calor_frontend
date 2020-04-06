import PropTypes from 'prop-types';

export const Reading = PropTypes.shape({
    Name: PropTypes.string,
    Unit: PropTypes.string,
    Time: PropTypes.string,
    Temp: PropTypes.number,
});
