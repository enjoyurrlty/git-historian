import { formatDateToRelative } from '../helpers/formatDateToRelative';

type CommitProps = {
  message: string;
  date: string;
  author: string;
};

function Commit({ message, date, author }: CommitProps) {
  return (
    <li className='bg-white dark:bg-zinc-700 shadow-md p-4 mb-4 min-w-30 rounded text-left'>
      <p className='text-1xl font-semibold whitespace-pre-line mb-4'>
        {message}
      </p>
      <div>
        <span>{formatDateToRelative(date)}</span>
        <span> by {author}</span>
      </div>
    </li>
  );
}

export default Commit;
