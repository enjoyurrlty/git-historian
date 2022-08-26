import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import Commit from './Commit';

enum RequestDetails {
  Method = 'GET',
  Url = '/repos/{owner}/{repo}/commits',
  Owner = 'enjoyurrlty',
  Repo = 'git-historian',
}

type CommitsList = {
  token: '';
};

function CommitsList({ token }: CommitsList) {
  const [data, setData] = useState<any[]>([]);
  const [reload, setReload] = useState(true);
  const [counter, setCounter] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (counter > 0) {
      timer = setInterval(() => setCounter(counter - 1), 1000);
    } else {
      setReload(!reload);
    }

    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const octokit = new Octokit({ auth: token });
    const fetch = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await octokit.request(
          [RequestDetails.Method, RequestDetails.Url].join(' '),
          {
            owner: RequestDetails.Owner,
            repo: RequestDetails.Repo,
          }
        );

        setData(result.data);
        setCounter(30);
      } catch (err) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetch();
  }, [token, reload]);

  return (
    <>
      <div className='flex items-center my-8 justify-end'>
        <p className='mr-2'>auto-refresh in {counter} seconds </p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='button'
          onClick={() => setReload(!reload)}
        >
          Refresh
        </button>
      </div>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
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
      )}
    </>
  );
}

export default CommitsList;
