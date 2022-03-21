import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@material-ui/core';
import MeasurementCard from './MeasurementCard';

// ----------------------------------------------------------------------

MeasurementList.propTypes = {
  measurementList: PropTypes.array.isRequired,
  isLoad: PropTypes.bool
};

export default function MeasurementList({ measurementList, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {measurementList.map((measurement) => (
        <Grid key={measurement.id} item xs={12} sm={6} md={3}>
          <MeasurementCard measurement={measurement} />
        </Grid>
      ))}
    </Grid>
  );
}
