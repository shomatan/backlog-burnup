export type List<A> = ReadonlyArray<A>;

export interface Project {
  readonly id: number;
  readonly name: string;
}
export const Project = (id: number, name: string): Project => ({ id, name });

export interface Issue {
  readonly id: number;
  readonly key: string;
  readonly summary: string;
  readonly point: number;
  readonly milestones: ReadonlyArray<BacklogMilestone>;
}
export const Issue = (
  id: number,
  key: string,
  summary: string,
  point: number,
  milestones: ReadonlyArray<BacklogMilestone>
): Issue => ({
  id,
  key,
  summary,
  point,
  milestones,
});

export const sumPoint = (issues: List<Issue>): number =>
  issues
    .map((issue: Issue) => issue.point)
    .reduce((sum: number, current: number) => sum + current, 0);

export interface IssueType {
  readonly id: number;
  readonly name: string;
}
export const IssueType = (id: number, name: string): IssueType => ({
  id,
  name,
});

export interface BacklogMilestone {
  readonly id: number;
  readonly name: string;
}
export const BacklogMilestone = (
  id: number,
  name: string
): BacklogMilestone => ({
  id,
  name,
});

export interface Milestone {
  readonly backlogMilestone: BacklogMilestone;
  readonly totalPoint: number;
}
export const Milestone = (
  backlogMilestone: BacklogMilestone,
  totalPoint: number
): Milestone => ({ backlogMilestone, totalPoint });
