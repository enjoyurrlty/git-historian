import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import Commit from './Commit';

enum REQUEST_DETAILS {
  METHOD = 'GET',
  URL = '/repos/{owner}/{repo}/commits',
  OWNER = 'enjoyurrlty',
  REPO = 'git-historian',
}

type CommitsList = {
  token: '';
};

function CommitsList({ token }: CommitsList) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const octokit = new Octokit({ auth: token });
    const fetch = async () => {
      const result = await octokit.request(
        [REQUEST_DETAILS.METHOD, REQUEST_DETAILS.URL].join(' '),
        {
          owner: REQUEST_DETAILS.OWNER,
          repo: REQUEST_DETAILS.REPO,
        }
      );
      setData(result.data);
    };

    fetch();
  }, []);
  return (
    <ul className='my-8'>
      {data.map(({ commit }) => (
        <Commit
          key={commit.url}
          author={commit.committer.name}
          message={commit.message}
          timestamp={commit.committer.date}
        />
      ))}
    </ul>
  );
}

export default CommitsList;
