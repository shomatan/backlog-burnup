import {
  Issue,
  IssueType,
  BacklogMilestone,
  Project,
  ProjectList,
} from '../datas';

export const fetchProjectsList = async (
  backlog_url: string,
  api_key: string
): Promise<ReadonlyArray<ProjectList>> => {
  const res = await fetchBacklog('/api/v2/projects', [], backlog_url, api_key);
  const json = await res.json();
  return json;
};

export const fetchProjectInfo = async (
  projectKey: string
): Promise<Project> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}`);
  const json = await res.json();

  return Project(json.id, json.name);
};

export const fetchIssueType = async (
  projectKey: String
): Promise<ReadonlyArray<IssueType>> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}/issueTypes`);
  const json = await res.json();

  return json.map((item: any) => IssueType(item.id, item.name));
};

export const fetchMilestones = async (
  projectKey: string
): Promise<ReadonlyArray<BacklogMilestone>> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}/versions`);
  const json = await res.json();

  return json
    .map((item: any) => {
      let startDate = null;
      if (item.startDate) {
        startDate = new Date(item.startDate);
      }
      let releaseDueDate = null;
      if (item.releaseDueDate) {
        releaseDueDate = new Date(item.releaseDueDate);
      }
      return BacklogMilestone(
        item.id,
        item.name,
        startDate,
        releaseDueDate,
        item.archived
      );
    })
    .filter((item: BacklogMilestone) => !item.archived);
};

export const fetchIssuesOfIssueType = async (
  projectId: number,
  issueTypeId: number
): Promise<ReadonlyArray<Issue>> => {
  const res = await fetchBacklog('/api/v2/issues', [
    `projectId[]=${projectId}`,
    `issueTypeId[]=${issueTypeId}`,
    'count=100',
  ]);
  const json = await res.json();

  return json.map((item: any) => {
    const milestones = item.milestone.map((m: any) =>
      BacklogMilestone(
        m.id,
        m.name,
        new Date(m.startDate),
        new Date(m.releaseDueDate),
        m.archived
      )
    );
    return Issue(
      item.id,
      item.key,
      item.summary,
      item.estimatedHours,
      milestones
    );
  });
};

const fetchBacklog = (
  endpoint: string,
  params: Array<string> = [],
  backlog_url?: string,
  api_key?: string
): Promise<Response> => {
  let url = `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`;
  if (backlog_url && api_key) {
    url = `${backlog_url}${endpoint}?apiKey=${api_key}`;
  }
  if (params.length > 0) {
    url = url + '&' + params.join('&');
  }

  return fetch(url);
};
