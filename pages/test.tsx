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
import { dateString, Milestone, Milestones, Releases } from '../src/datas';
import {
  fetchIssuesOfIssueType,
  fetchMilestones,
} from '../src/network/BacklogAPI';

const Test = (): JSX.Element => {
  const [projectId, setProjectId] = useState(null);
  const [projectStartDate, setProjectStartDate] = useState<Date>(null);
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issues, setIssues] = useState(null);
  const [milestones, setMilestones] = useState<Milestones>(Milestones([]));
  const [backlogMilestones, setBacklogMilestones] = useState<Milestones>(
    Milestones(null)
  );
  const [releases, setReleases] = useState<Releases>(Releases([]));
  const [data, setData] = useState([]);

  const projectKey = process.env.BACKLOG_PROJECT_KEY;

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

      const computed = backlogMilestones.filterByIssues(fetchIssues);
      setMilestones(computed);

      // Release milestones
      const releaseItems = computed.toReleases();
      setReleases(releaseItems);

      // set graph
      let array = [];
      if (projectStartDate) {
        array.push(releaseItems.getHorizontalLines(projectStartDate));
      }

      setData(
        array.concat(computed.sortByStartDate().getGraphLines(releaseItems))
      );
    }
  };

  useEffect(() => {
    if (issues || !projectId || !issueTypeId) return;
    (async () => {
      setIssues(await fetchIssuesOfIssueType(projectId, issueTypeId));
    })();
  }, [issues]);

  useEffect(() => {
    if (backlogMilestones.nonEmpty()) return;
    (async () => {
      const items = await fetchMilestones(projectKey);
      const sorted = items.sortByStartDate();

      if (sorted.length() > 0) {
        setProjectStartDate(sorted.items[0].startDate());
      }
      setBacklogMilestones(items);
      setMilestones(sorted);
    })();
  }, [backlogMilestones]);

  return (
    <div>
      <section>
        <h1>Backlog Burn Up</h1>
      </section>
      <section>
        <ProjectComponent projectKey={projectKey} setProjectId={setProjectId} />
        <p>
          Project begin:
          {(() => {
            if (projectStartDate) {
              return dateString(projectStartDate);
            }
          })()}
        </p>
      </section>
      <IssueTypesComponent
        projectKey={projectKey}
        onChange={onIssueTypeChange}
      />
      <MilestonesComponent milestones={milestones} />
      <section>
        {(() => {
          if (data) {
            return (
              <LineChart
                width={600}
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
                <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
                {(() => {
                  return releases.items.map((release: Milestone) => (
                    <Line
                      type="monotone"
                      dataKey={release.backlogMilestone.name}
                    />
                  ));
                })()}
              </LineChart>
            );
          }
        })()}
      </section>
      <IssuesComponent issues={issues} />
    </div>
  );
};

export default Test;
