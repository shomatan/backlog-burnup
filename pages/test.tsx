import { useState, useEffect } from 'react';

const fetchProjectInfo = async (projectKey: string): Promise<Project> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}`)
  const json = await res.json();
  
  return Project(json.name)
}

const fetchIssueType = (projectKey: String): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/issueTypes`);

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

const Test = (): JSX.Element => {
  const [issueTypes, setIssueTypes] = useState(null);
  const [milestones, setMilestones] = useState(null);

  const projectKey = process.env.BACKLOG_PROJECT_KEY;
  const milestoneItems = (items: Array<any>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.name}</li>);
  };

  useEffect(() => {
    if (issueTypes) return;
    (async () => {
      const res = await fetchIssueType(projectKey);
      setIssueTypes(await res.json());
    })();
  }, [issueTypes]);

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
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
    </div>
  );
};

export default Test;
