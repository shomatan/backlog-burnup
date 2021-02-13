import { useEffect, useState } from 'react';
import { Issue, sumPoint } from '../datas';

export const IssuesComponent = ({ issues }): JSX.Element => {
  const [total, setTotal] = useState(0);

  const list = (items: ReadonlyArray<Issue>) => {
    if (!items) return <></>;

    return items.map((item) => (
      <li key={item.id}>
        [{item.point}] {item.summary}
      </li>
    ));
  };

  useEffect(() => {
    if (!issues) return;
    setTotal(sumPoint(issues));
  }, [issues]);

  return (
    <>
      <h3>Issues</h3>
      <h4>Total: {total}pt</h4>
      {list(issues)}
    </>
  );
};
