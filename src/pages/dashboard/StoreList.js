import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Chart } from 'react-google-charts';
// material
import {
  Card,
  Table,
  Button,
  CardHeader,
  Box,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// redux
import axios from '../../utils/axios';
import { useDispatch, useSelector } from '../../redux/store';
import { getStoreList, deleteStore } from '../../redux/slices/store';
// import { getBrandList } from '../../redux/slices/brand';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { StoreListHead, StoreListToolbar, StoreMoreMenu } from '../../components/_dashboard/store/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Store ID', alignRight: false },
  { id: 'brandId', label: 'Brand ID', alignRight: false },
  { id: 'sName', label: 'Name', alignRight: false },
  { id: 'sAddress', label: 'Address', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, searchQuery) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (searchQuery) {
    return filter(array, (_store) => _store.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StoreList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { storeList } = useSelector((state) => state.store);
  // const { brandList } = useSelector((state) => state.brand);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('sName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [chartData, setChartData] = useState([]);
  // const [brandName, setBrandName] = useState('');

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getBrandList());
  // }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = storeList.map((n) => n.sName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, sName) => {
    const selectedIndex = selected.indexOf(sName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteStore = (sId) => {
    axios.delete(`/store?id=${sId}`);
    dispatch(deleteStore(sId));
  };

  const handleGetChartData = () => {
    console.log('yeeeeeeeeeeeeeeee');
    try {
      const response = axios
        .get('/stores/report', {
          params: { storeId: 12, year: 2022 }
        })
        .then((res) => setChartData(res.data));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const handleDropdown = (event) => {
  //   const brandDropdown = brandList.map((brand) => brand.brandName);
  //   setBrandName(brandDropdown);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - storeList.length) : 0;

  const filteredStore = applySortFilter(storeList, getComparator(order, orderBy), filterName);

  const isStoreNotFound = filteredStore.length === 0;

  useEffect(() => {
    handleGetChartData();
  }, []);

  return (
    <Page title="Store: List | WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Store List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Store', href: PATH_DASHBOARD.store.list },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.store.newStore}
              startIcon={<Icon icon={plusFill} />}
            >
              New Store
            </Button>
          }
        />

        <Card>
          <CardHeader title="Total Store Usage" subheader="" />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Chart chartType="Bar" data={chartData} height="364px" />
          </Box>
        </Card>

        <Card>
          <StoreListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // brandName={handleDropdown}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <StoreListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={storeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredStore.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, brandId, sName, sAddress } = row;
                    const isItemSelected = selected.indexOf(sName) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, sName)} />
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{brandId}</TableCell>
                        <TableCell align="left">{sName}</TableCell>
                        <TableCell align="left">{sAddress}</TableCell>

                        <TableCell align="right">
                          <StoreMoreMenu onDelete={() => handleDeleteStore(id)} storeId={id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isStoreNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={storeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
