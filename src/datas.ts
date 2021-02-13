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
  readonly milestones: ReadonlyArray<Milestone>;
}
export const Issue = (
  id: number,
  key: string,
  summary: string,
  point: number,
  milestones: ReadonlyArray<Milestone>
): Issue => ({
  id,
  key,
  summary,
  point,
  milestones,
});

export interface IssueType {
  readonly id: number;
  readonly name: string;
}
export const IssueType = (id: number, name: string): IssueType => ({
  id,
  name,
});

export interface Milestone {
  readonly id: number;
  readonly name: string;
}
export const Milestone = (id: number, name: string): Milestone => ({
  id,
  name,
});
