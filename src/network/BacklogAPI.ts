import { Issue, IssueType, Project } from '../datas';

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

export const fetchMilestones = (projectKey: string): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/versions`);

export const fetchIssuesOfIssueType = async (
  projectId: number,
  issueTypeId: number
): Promise<ReadonlyArray<Issue>> => {
  const res = await fetchBacklog('/api/v2/issues', [
    `projectId[]=${projectId}`,
    `issueTypeId[]=${issueTypeId}`,
  ]);
  const json = await res.json();

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

  return fetch(url);
};
