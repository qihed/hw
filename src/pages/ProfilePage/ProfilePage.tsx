import { useNavigate } from 'react-router';
import Button from 'components/Button';
import { logout } from 'api/auth';
import styles from 'pages/ProfilePage/ProfilePage.module.scss';

/* пока пишется */

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout().then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default ProfilePage;
