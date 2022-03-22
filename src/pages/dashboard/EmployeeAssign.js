import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getEmployeeList } from '../../redux/slices/employee';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import EmployeeAssignForm from '../../components/_dashboard/employee/EmployeeAssignForm';

// ----------------------------------------------------------------------

export default function EmployeeCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { employeeId } = useParams();
  const { employeeList } = useSelector((state) => state.employee);
  const currentEmployee = employeeList.find((employee) => employee.id.toString() === employeeId);

  useEffect(() => {
    dispatch(getEmployeeList());
  }, [dispatch]);

  return (
    <Page title="Employee: Assign employee to store| WAEM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Assign employee"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Employee',
              href: PATH_DASHBOARD.employee.root
            },
            { name: 'Assign Employee' }
          ]}
        />

        <EmployeeAssignForm currentEmployee={currentEmployee} />
      </Container>
    </Page>
  );
}
