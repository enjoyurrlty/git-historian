import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import CommitsList from './components/CommitsList';
import Layout from './components/Layout';
import Header from './components/Header';
import { useSessionStorage } from './hooks/useSessionStorage';
import AccessKeyForm from './components/AccessKeyForm';

// TODO: temporary solution
const token = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN;
const owner = 'enjoyurrlty';
const repo = 'git-historian';

function App() {
  const [data, setData] = useState<any[]>([]);
  const [userToken, setUserToken] = useSessionStorage(
    'PersonalAccessToken',
    token
  );

  useEffect(() => {
    const octokit = new Octokit({ auth: userToken });
    const fetch = async () => {
      const result = await octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner,
          repo,
        }
      );
      setData(result.data);
    };

    fetch();
  }, []);

  return (
    <Layout>
      <Header />
      {userToken ? (
        <CommitsList data={data} />
      ) : (
        <AccessKeyForm onSubmit={setUserToken} />
      )}
    </Layout>
  );
}

export default App;
