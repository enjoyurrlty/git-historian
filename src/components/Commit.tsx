type CommitProps = {
  message: string;
  timestamp: string;
  author: string;
};

function Commit({ message, timestamp, author }: CommitProps) {
  return (
    <li className='bg-white dark:bg-zinc-700 shadow-md p-4 mb-4 min-w-30 rounded text-left'>
      <p className='text-2xl font-semibold'>
        <a href='#'>{message}</a>
      </p>
      <div>
        <span>{timestamp}</span>
        <span> by {author}</span>
      </div>
    </li>
  );
}

export default Commit;
