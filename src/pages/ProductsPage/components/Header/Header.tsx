import Text from '../../../../components/Text';
import styles from './Header.module.scss';
import logo from '../../../../assets/logo.png';
import bag from '../../../../assets/bag-2.png';
import user from '../../../../assets/user.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" />

      <div className={styles.namePages}>
        <Text className={`${styles.text} ${styles.textAccent}`}>Products</Text>
        <Text className={styles.text}>Categories</Text>
        <Text className={styles.text}>About us</Text>
      </div>
      <div className={styles.actionBtn}>
        <img className={styles.bag} src={bag} alt="Bag items" />
        <img className={styles.user} src={user} alt="User profile" />
      </div>
    </header>
  );
};

export default Header;
