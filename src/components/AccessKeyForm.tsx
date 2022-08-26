import { useState, FormEventHandler, useEffect } from 'react';
import { Octokit } from '@octokit/core';

enum UserRequestDetails {
  Method = 'GET',
  Url = '/user',
}

type AccessKeyFormProps = {
  onSubmit: (val: string) => void;
};

function AccessKeyForm({ onSubmit }: AccessKeyFormProps) {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    setIsError(false);
    setIsLoading(true);

    const octokit = new Octokit({ auth: value });

    try {
      const result = await octokit.request(
        [UserRequestDetails.Method, UserRequestDetails.Url].join(' '),
        {}
      );

      result.data && onSubmit(value);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <>
      <ul className='text-left w-1/2 mx-auto mt-8 space-y-2'>
        <li>
          Go to{' '}
          <a
            className='hover:text-blue-500'
            href='https://github.com/settings/tokens/new'
          >
            https://github.com/settings/tokens/new
          </a>
        </li>
        <li>Generate a token</li>
        <li>Paste it below</li>
        <li>Hit enter</li>
      </ul>
      <form className='my-8' onSubmit={handleSubmit}>
        <label>
          <input
            type='text'
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
            className='relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline mb-2'
            placeholder='Your Personal Access Key here'
          />
          {isError && (
            <div className='text-red-500'>
              Something went wrong ...
            </div>
          )}
          {isLoading && <div>Loading ...</div>}
        </label>
      </form>
    </>
  );
}
export default AccessKeyForm;
