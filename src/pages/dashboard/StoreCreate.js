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
import StoreNewForm from '../../components/_dashboard/store/StoreNewForm';

// ----------------------------------------------------------------------

export default function StoreCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { storeId } = useParams();
  const { storeList } = useSelector((state) => state.store);
  const isEdit = pathname.includes('edit');
  const currentStore = storeList.find((store) => store.storeId === storeId);

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  return (
    <Page title="Store: Create a new store | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new store' : 'Edit store'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Store',
              href: PATH_DASHBOARD.store.root
            },
            { name: !isEdit ? 'New product' : 'Update Store' }
          ]}
        />

        <StoreNewForm isEdit={isEdit} currentStore={currentStore} />
      </Container>
    </Page>
  );
}
