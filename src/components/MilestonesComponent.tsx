import { useEffect, useState } from 'react';
import { Milestone } from '../datas';
import { fetchMilestones } from '../network/BacklogAPI';

export const MilestonesComponent = ({ projectKey }): JSX.Element => {
  const [milestones, setMilestones] = useState<ReadonlyArray<Milestone>>(null);

  const milestoneItems = (items: ReadonlyArray<Milestone>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.name}</li>);
  };

  useEffect(() => {
    if (milestones) return;
    (async () => {
      setMilestones(await fetchMilestones(projectKey));
    })();
  }, [milestones]);

  return (
    <>
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
    </>
  );
};
