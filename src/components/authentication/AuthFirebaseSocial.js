import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
// material
import { Stack, Button } from '@material-ui/core';
// hooks
import axios from '../../utils/axios';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthFirebaseSocials() {
  const { loginWithGoogle } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      const g = await loginWithGoogle();
      console.log(g.user.uid);
      const { uid } = g.user;
      axios
        .post('/users/login', { uid })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.token);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginGoogle}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>
      </Stack>
    </>
  );
}
