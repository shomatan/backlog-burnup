import { useEffect, useState } from 'react';
import { fetchMilestones } from '../network/BacklogAPI';

export const MilestonesComponent = ({ projectKey }): JSX.Element => {
  const [milestones, setMilestones] = useState(null);

  const milestoneItems = (items: Array<any>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.name}</li>);
  };

  useEffect(() => {
    if (milestones) return;
    (async () => {
      const res = await fetchMilestones(projectKey);
      const json = await res.json();
      setMilestones(json);
    })();
  }, [milestones]);

  return (
    <>
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
    </>
  );
};
