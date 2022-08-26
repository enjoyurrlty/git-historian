import CommitsList from './components/CommitsList';
import Layout from './components/Layout';
import Header from './components/Header';
import AccessKeyForm from './components/AccessKeyForm';
import { useSessionStorage } from './hooks/useSessionStorage';

// TODO: temporary solution
const token = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN;

function App() {
  const [userToken, setUserToken] = useSessionStorage(
    'PersonalAccessToken',
    token
  );

  return (
    <Layout>
      <Header />
      {userToken ? (
        <CommitsList token={userToken} />
      ) : (
        <AccessKeyForm onSubmit={setUserToken} />
      )}
    </Layout>
  );
}

export default App;
