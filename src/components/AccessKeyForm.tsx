import { useState, FormEventHandler } from 'react';

type AccessKeyFormProps = {
  onSubmit: (val: string) => void;
};

function AccessKeyForm({ onSubmit }: AccessKeyFormProps) {
  const [value, setValue] = useState('');
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='relative outline-none rounded py-3 px-3 w-full bg-white shadow text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:shadow-outline mb-5'
        placeholder='Your Personal Access Key here'
      />
    </form>
  );
}
export default AccessKeyForm;
