import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBrandList } from '../../redux/slices/brand';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import BrandDetailForm from '../../components/_dashboard/brand/BrandDetailForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const { brandList } = useSelector((state) => state.brand);
  const currentBrand = brandList.find((brand) => brand.id.toString() === brandId);

  useEffect(() => {
    dispatch(getBrandList());
  }, [dispatch]);

  return (
    <Page title="Brand: Detail | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Brand Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Brand', href: PATH_DASHBOARD.brand.list },
            { name: 'Detail' }
          ]}
        />
        <BrandDetailForm currentBrand={currentBrand} />
      </Container>
    </Page>
  );
}
