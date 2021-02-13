import { useEffect, useState } from 'react';
import { Issue, List, Milestone, sumPoint } from '../datas';
import { fetchMilestones } from '../network/BacklogAPI';

interface Props {
  readonly projectKey: string;
  readonly issues: List<Issue>;
}

export const MilestonesComponent = (props: Props): JSX.Element => {
  const [milestones, setMilestones] = useState<List<Milestone>>(null);

  const milestoneItems = (items: List<Milestone>) => {
    if (!items) return <></>;
    return items.map((item) => {
      let point = 0;

      if (props.issues) {
        const milestoneIssues = props.issues.filter(
          (issue: Issue) =>
            issue.milestones.findIndex(
              (milestone) => item.id == milestone.id
            ) != -1
        );
        point = sumPoint(milestoneIssues);
      }
      return (
        <li key={item.id}>
          [{point}] {item.name}
        </li>
      );
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
