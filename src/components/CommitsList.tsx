import Commit from './Commit';

type CommitsList = {
  data: any[];
};

function CommitsList({ data }: CommitsList) {
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
