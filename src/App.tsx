import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import CommitsList from './components/CommitsList';
import Layout from './components/Layout';
import Header from './components/Header';

// TODO: temporary solution
const token = import.meta.env.PERSONAL_ACCESS_TOKEN;
const owner = 'enjoyurrlty';
const repo = 'git-historian';

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const octokit = new Octokit({ auth: token });
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
      <CommitsList data={data} />
    </Layout>
  );
}

export default App;
