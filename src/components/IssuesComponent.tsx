import { Issue } from '../datas';

export const IssuesComponent = ({ issues }): JSX.Element => {
  const list = (items: ReadonlyArray<Issue>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.summary}</li>);
  };

  return (
    <>
      <h3>Issues</h3>
      {list(issues)}
    </>
  );
};
