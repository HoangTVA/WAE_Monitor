import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import electricFilled from '@iconify/icons-ant-design/bulb-outlined';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import axios from 'axios';
import { fShortenNumber } from '../../../utils/formatNumber';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AnalyticsElectric() {
  const [brandCount, setBrandCount] = useState(0);
  const handleGetBrandCount = () => {
    try {
      const response = axios.get('/brands').then((res) => setBrandCount(res.data.length));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetBrandCount();
  }, [brandCount]);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={electricFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(brandCount)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Brands
      </Typography>
    </RootStyle>
  );
}
