import React, { useState, useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { IssuesComponent } from '../src/components/IssuesComponent';
import { IssueTypesComponent } from '../src/components/IssueTypesComponent';
import { MilestonesComponent } from '../src/components/MilestonesComponent';
import { ProjectComponent } from '../src/components/ProjectComponent';
import {
  BacklogMilestone,
  Issue,
  List,
  Milestone,
  sumPoint,
} from '../src/datas';
import {
  fetchIssuesOfIssueType,
  fetchMilestones,
} from '../src/network/BacklogAPI';

const Test = (): JSX.Element => {
  const [projectId, setProjectId] = useState(null);
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issues, setIssues] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [backlogMilestones, setBacklogMilestones] = useState<
    List<BacklogMilestone>
  >(null);
  const [releases, setReleases] = useState<List<Milestone>>([]);
  const [data, setData] = useState([]);

  const projectKey = process.env.BACKLOG_PROJECT_KEY;
  const projectBegin = new Date(2021, 1, 5);
  const sprintDays = 7;

  const onIssueTypeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const id = Number(e.target.value);
    setIssueTypeId(id);

    if (id == 0) {
      setIssues([]);
      return;
    }
    if (projectId) {
      const fetchIssues = await fetchIssuesOfIssueType(projectId, id);
      setIssues(fetchIssues);

      const computed = backlogMilestones.map((item: BacklogMilestone) => {
        const milestoneIssues = fetchIssues.filter(
          (issue: Issue) =>
            issue.milestones.findIndex(
              (milestone) => item.id == milestone.id
            ) != -1
        );
        return Milestone(item, sumPoint(milestoneIssues));
      });
      setMilestones(computed);

      // Release milestones
      const releaseItems = computed.filter((milestone: Milestone) =>
        milestone.backlogMilestone.name.includes('Release')
      );
      setReleases(releaseItems);

      console.log('computed: %o', computed);
      // set graph
      const datas = computed
        .filter(
          (milestone: Milestone) =>
            milestone.backlogMilestone.name.includes('Sprint') &&
            milestone.backlogMilestone.startDate
        )
        .map((milestone: Milestone) => {
          let item = {
            name: milestone.backlogMilestone.startDate.toLocaleDateString('ja'),
          };

          releaseItems.map((release: Milestone) => {
            item[release.backlogMilestone.name] = release.totalPoint;
          });

          return item;
        });

      console.dir(datas);
      setData(datas);
    }
  };

  useEffect(() => {
    if (issues || !projectId || !issueTypeId) return;
    (async () => {
      setIssues(await fetchIssuesOfIssueType(projectId, issueTypeId));
    })();
  }, [issues]);

  useEffect(() => {
    if (backlogMilestones) return;
    (async () => {
      const items = await fetchMilestones(projectKey);
      const computed = items.map((item) => Milestone(item, 0));

      setBacklogMilestones(items);
      setMilestones(computed);
    })();
  }, [backlogMilestones]);

  return (
    <div>
      <section>
        <h1>Backlog Burn Up</h1>
      </section>
      <section>
        <ProjectComponent projectKey={projectKey} setProjectId={setProjectId} />
        <p>Project begin: {projectBegin.toLocaleDateString('ja')}</p>
        <p>Days per Sprint: {sprintDays} days / sprint</p>
      </section>
      <IssueTypesComponent
        projectKey={projectKey}
        onChange={onIssueTypeChange}
      />
      <MilestonesComponent milestones={milestones} />
      <section>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {(() => {
            return releases.map((release: Milestone) => (
              <Line type="monotone" dataKey={release.backlogMilestone.name} />
            ));
          })()}
        </LineChart>
      </section>
      <IssuesComponent issues={issues} />
    </div>
  );
};

/* interface { */
/*   readonly */
/* } */

export default Test;
