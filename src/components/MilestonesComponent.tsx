import { useEffect, useState } from 'react';
import { Issue, Milestone } from '../datas';
import { fetchMilestones } from '../network/BacklogAPI';

interface Props {
  readonly projectKey: string;
  readonly issues: ReadonlyArray<Issue>;
}

export const MilestonesComponent = (props: Props): JSX.Element => {
  const [milestones, setMilestones] = useState<ReadonlyArray<Milestone>>(null);

  const milestoneItems = (items: ReadonlyArray<Milestone>) => {
    if (!items) return <></>;
    return items.map((item) => {
      return <li key={item.id}>{item.name}</li>;
    });
  };

  useEffect(() => {
    if (milestones) return;
    (async () => {
      setMilestones(await fetchMilestones(props.projectKey));
    })();
  }, [milestones]);

  return (
    <>
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
    </>
  );
};
