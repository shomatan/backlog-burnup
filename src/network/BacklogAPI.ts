import {
  Issue,
  IssueType,
  BacklogMilestone,
  Project,
  Milestone,
  Milestones,
} from '../datas';

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
): Promise<Milestones> => {
  const res = await fetchBacklog(`/api/v2/projects/${projectKey}/versions`);
  const json = await res.json();
  const items = json
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
    .filter((item: BacklogMilestone) => !item.archived)
    .map((item: BacklogMilestone) => Milestone(item, 0));

  return Milestones(items);
};

export const fetchIssuesOfIssueType = async (
  projectId: number,
  issueTypeId: number
): Promise<ReadonlyArray<Issue>> => {
  const count = 100;
  let lastFetchedIssueCount = 0;
  let allItems = [];

  do {
    const res = await fetchBacklog('/api/v2/issues', [
      `projectId[]=${projectId}`,
      `issueTypeId[]=${issueTypeId}`,
      `count=${count}`,
      `offset=${allItems.length}`,
    ]);

    const items = await res.json();
    lastFetchedIssueCount = items.length;
    allItems = allItems.concat(items);

    if (allItems.length >= 1000) { // Take care about API Limit
      break;
    }
  } while (lastFetchedIssueCount === count);


  return allItems.map((item: any) => {
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
  params: Array<string> = []
): Promise<Response> => {
  let url = `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`;
  if (params.length > 0) {
    url = url + '&' + params.join('&');
  }

  return fetch(url);
};
