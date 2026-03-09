import Text from 'components/Text';
import Input from 'components/Input';
import styles from './LoginPage.module.scss';

/* пока пишется */

const LoginPage = () => {
  const handleSubmitLogin = () => {
    return;
  };
  return (
    <div>
      <Text view="title">Добро пожаловать</Text>
      <Text view="p-20" color="secondary">
        Войдите в свой аккаунт
      </Text>
      <form action="submit">
        <Input
          value=""
          placeholder="You email"
          className={styles.input}
          onChange={handleSubmitLogin}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitLogin()}
        />
        <Input
          value=""
          placeholder="You pass"
          className={styles.input}
          onChange={handleSubmitLogin}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmitLogin()}
        />
      </form>
    </div>
  );
};

export default LoginPage;
