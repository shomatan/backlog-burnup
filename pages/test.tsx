import { useState, useEffect } from 'react';

const fetchProjectInfo = async (projectKey: string): Promise<Project> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}`)
  const json = await res.json();
  
  return Project(json.name)
}

const fetchIssueType = async (projectKey: String): Promise<ReadonlyArray<IssueType>> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}/issueTypes`);
  const json = await res.json();

  return json.map((item: any) => IssueType(item.id, item.name))
}

const fetchMilestones = (projectKey: string): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/versions`);

const fetchBacklog = (endpoint: string): Promise<Response> =>
  fetch(
    `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`
  );

interface Project {
  readonly name: string;
}
const Project = (name: string): Project => ({ name });

const ProjectComponent = ({projectKey}): JSX.Element => {
  const [project, setProject] = useState(Project(''));

  useEffect(() => {
    if (project.name !== '') return;
    (async () => {
      setProject(await fetchProjectInfo(projectKey));
    })();
  }, [project]);

  return <h3>Project: {project.name}</h3>;
};

interface IssueType {
  readonly id: number;
  readonly name: string;
}
const IssueType = (id: number, name: string): IssueType => ({id, name})

const IssueTypesComponent = ({projectKey}): JSX.Element => {
  const [issueTypes, setIssueTypes] = useState<ReadonlyArray<IssueType>>(null);

  const list = (items: ReadonlyArray<IssueType>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.name}</li>);
  };

  useEffect(() => {
    if (issueTypes) return;
    (async () => {
      setIssueTypes(await fetchIssueType(projectKey));
    })();
  }, [issueTypes]);

  return <>
    <h3>Issue Types</h3>
  {list(issueTypes)}
  </>
}

const Test = (): JSX.Element => {
  const [milestones, setMilestones] = useState(null);

  const projectKey = process.env.BACKLOG_PROJECT_KEY;
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
    <div>
      <h1>Backlog Burn Up</h1>
      <ProjectComponent projectKey={projectKey} />
      <IssueTypesComponent projectKey={projectKey} />
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
    </div>
  );
};

export default Test;
