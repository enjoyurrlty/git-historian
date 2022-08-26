import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import Commit from './components/Commit';

import './App.css';

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
    <div className='w-full'>
      <h2 className='text-5xl mb-5'>Welcome to Git Historian!</h2>
      <ul>
        {data.map(({ commit }) => (
          <Commit
            key={commit.url}
            author={commit.committer.name}
            message={commit.message}
            timestamp={commit.committer.date}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
