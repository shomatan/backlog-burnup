import { useEffect, useState } from 'react';
import { IssueType } from '../datas';
import { fetchIssueType } from '../network/BacklogAPI';

interface Props {
  readonly projectKey: string;
  readonly onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const IssueTypesComponent = (props: Props): JSX.Element => {
  const [issueTypes, setIssueTypes] = useState<ReadonlyArray<IssueType>>(null);

  const list = (items: ReadonlyArray<IssueType>) => {
    if (!items) return <></>;
    return items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  useEffect(() => {
    if (issueTypes) return;
    (async () => {
      setIssueTypes(await fetchIssueType(props.projectKey));
    })();
  }, [issueTypes]);

  return (
    <>
      <h3>Issue Types</h3>
      <select name="issueTypes" onChange={props.onChange}>
        <option key={0} value={''}></option>
        {list(issueTypes)}
      </select>
    </>
  );
};
