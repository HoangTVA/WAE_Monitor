import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const MeasurementImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

MeasurementCard.propTypes = {
  measurement: PropTypes.object
};

export default function MeasurementCard({ measurement }) {
  const { id, meterName, evidence, measure, mDate, mMonth } = measurement;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <MeasurementImgStyle alt={meterName} src={evidence} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {meterName}
        </Typography>

        <Stack direction="column" alignItems="left" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled'
              }}
            >
              Measure:&nbsp;
            </Typography>
            {measure}
          </Typography>
          <Typography variant="subtitle1">{mDate}</Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled'
              }}
            >
              Month:&nbsp;
            </Typography>
            {mMonth}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
