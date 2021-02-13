import { List, Milestone } from '../datas';

interface Props {
  readonly milestones: List<Milestone>;
}

export const MilestonesComponent = (props: Props): JSX.Element => {
  const milestoneItems = (items: List<Milestone>) => {
    if (!items) return <></>;
    return items.map((item) => {
      return (
        <li key={item.backlogMilestone.id}>
          [{item.totalPoint}] {item.backlogMilestone.name}
        </li>
      );
    });
  };

  return (
    <>
      <h3>Milestones</h3>
      {milestoneItems(props.milestones)}
    </>
  );
};
