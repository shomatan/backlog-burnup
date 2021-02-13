import { useState, useEffect } from 'react';
import { Issue, IssueType, Project } from '../src/datas';

const fetchProjectInfo = async (projectKey: string): Promise<Project> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}`);
  const json = await res.json();

  return Project(json.id, json.name);
};

const fetchIssueType = async (
  projectKey: String
): Promise<ReadonlyArray<IssueType>> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}/issueTypes`);
  const json = await res.json();

  return json.map((item: any) => IssueType(item.id, item.name));
};

const fetchMilestones = (projectKey: string): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/versions`);

const fetchIssuesOfIssueType = async (
  projectId: number,
  issueTypeId: number
): Promise<ReadonlyArray<Issue>> => {
  const res = await fetchBacklog('/api/v2/issues', [
    `projectId[]=${projectId}`,
    `issueTypeId[]=${issueTypeId}`,
  ]);
  const json = await res.json();
  console.dir(json);
  return json.map((item: any) => Issue(item.id, item.key, item.summary));
};

const fetchBacklog = (
  endpoint: string,
  params: Array<string> = []
): Promise<Response> => {
  let url = `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`;
  if (params.length > 0) {
    url = url + '&' + params.join('&');
  }
  console.log(url);
  return fetch(url);
};

interface ProjectProps {
  readonly projectKey: string;
  readonly setProjectId: (e: number) => void;
}
const ProjectComponent = (props: ProjectProps): JSX.Element => {
  const [project, setProject] = useState(Project(0, ''));

  useEffect(() => {
    if (project.id > 0) return;
    (async () => {
      const p = await fetchProjectInfo(props.projectKey);
      setProject(p);
      props.setProjectId(p.id);
    })();
  }, [project]);

  return <h3>Project: {project.name}</h3>;
};

interface IssueTypesProps {
  readonly projectKey: string;
  readonly onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const IssueTypesComponent = (props: IssueTypesProps): JSX.Element => {
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

const IssuesComponent = ({ issues }): JSX.Element => {
  const list = (items: ReadonlyArray<Issue>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.summary}</li>);
  };

  return (
    <>
      <h3>Issues</h3>
      {list(issues)}
    </>
  );
};

const Test = (): JSX.Element => {
  const [milestones, setMilestones] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issues, setIssues] = useState(null);

  const projectKey = process.env.BACKLOG_PROJECT_KEY;
  const milestoneItems = (items: Array<any>) => {
    if (!items) return <></>;
    return items.map((item) => <li key={item.id}>{item.name}</li>);
  };
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
      setIssues(await fetchIssuesOfIssueType(projectId, id));
    }
  };

  useEffect(() => {
    if (milestones) return;
    (async () => {
      const res = await fetchMilestones(projectKey);
      const json = await res.json();
      setMilestones(json);
    })();
  }, [milestones]);

  useEffect(() => {
    if (issues || !projectId || !issueTypeId) return;
    (async () => {
      setIssues(await fetchIssuesOfIssueType(projectId, issueTypeId));
    })();
  }, [issues]);

  return (
    <div>
      <h1>Backlog Burn Up</h1>
      <ProjectComponent projectKey={projectKey} setProjectId={setProjectId} />
      <IssueTypesComponent
        projectKey={projectKey}
        onChange={onIssueTypeChange}
      />
      <h3>Milestones</h3>
      {milestoneItems(milestones)}
      <IssuesComponent issues={issues} />
    </div>
  );
};

export default Test;
