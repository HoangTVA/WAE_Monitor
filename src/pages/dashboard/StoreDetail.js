import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getStoreList } from '../../redux/slices/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import StoreDetailForm from '../../components/_dashboard/store/StoreDetailForm';

// ----------------------------------------------------------------------

export default function StoreCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const { storeList } = useSelector((state) => state.store);
  const currentStore = storeList.find((store) => store.id.toString() === storeId);

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  return (
    <Page title="Store: Detail | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Store Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Store', href: PATH_DASHBOARD.store.list },
            { name: 'Detail' }
          ]}
        />
        <StoreDetailForm currentStore={currentStore} />
      </Container>
    </Page>
  );
}
