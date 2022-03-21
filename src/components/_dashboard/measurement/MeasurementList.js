import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@material-ui/core';
import MeasurementCard from './MeasurementCard';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

MeasurementList.propTypes = {
  measurementList: PropTypes.array.isRequired,
  isLoad: PropTypes.bool
};

export default function MeasurementList({ measurementList }) {
  return (
    <Grid container spacing={3}>
      {measurementList.map((measurement) => (
        <Grid key={measurement.id} item xs={12} sm={6} md={3}>
          <MeasurementCard measurement={measurement} />
        </Grid>
      ))}

      {SkeletonLoad}
    </Grid>
  );
}
