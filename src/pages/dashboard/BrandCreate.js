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
import BrandNewForm from '../../components/_dashboard/brand/BrandNewForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { brandName } = useParams();
  const { brandList } = useSelector((state) => state.brand);
  const isEdit = pathname.includes('edit');
  const currentBrand = brandList.find((brand) => paramCase(brand.brandName) === brandName);

  useEffect(() => {
    dispatch(getBrandList());
  }, [dispatch]);

  return (
    <Page title="Brand: Create a new brand | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new brand' : 'Edit brand'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Brand', href: PATH_DASHBOARD.brand.list },
            { name: !isEdit ? 'New brand' : brandName }
          ]}
        />

        <BrandNewForm isEdit={isEdit} currentBrand={currentBrand} />
      </Container>
    </Page>
  );
}
