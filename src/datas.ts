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
  readonly startDate: Date;
  readonly releaseDueDate: Date;
  readonly archived: boolean;
}
export const BacklogMilestone = (
  id: number,
  name: string,
  startDate: Date,
  releaseDueDate: Date,
  archived: boolean
): BacklogMilestone => ({
  id,
  name,
  startDate,
  releaseDueDate,
  archived,
});

export const dateString = (d: Date): string => d.toLocaleDateString('ja');

export interface Milestone {
  readonly backlogMilestone: BacklogMilestone;
  readonly totalPoint: number;
  startDate: () => Date;
  releaseDueDate: () => Date;
  isSprint: () => boolean;
}
export const Milestone = (
  backlogMilestone: BacklogMilestone,
  totalPoint: number
): Milestone => ({
  backlogMilestone,
  totalPoint,
  startDate: () => backlogMilestone.startDate,
  releaseDueDate: () => backlogMilestone.releaseDueDate,
  isSprint: () =>
    backlogMilestone.name.includes('Sprint') &&
    backlogMilestone.startDate != null &&
    backlogMilestone.releaseDueDate != null,
});

export interface Milestones {
  readonly items: List<Milestone>;
  sortByDate: () => Milestones;
  length: () => number;
  toReleases: () => Releases;
  nonEmpty: () => boolean;
  isEmpty: () => boolean;
  filterByIssues: (issues: List<Issue>) => Milestones;
  getGraphLines: (releases: Releases) => any;
}
export const Milestones = (items: List<Milestone>): Milestones => ({
  items,
  sortByDate: () =>
    Milestones(
      items
        .filter((milestone: Milestone) => milestone.isSprint())
        .sort(
          (n1, n2) =>
            n1.backlogMilestone.startDate.getTime() -
            n2.backlogMilestone.startDate.getTime()
        )
    ),
  length: () => items.length,
  toReleases: () =>
    Releases(
      items.filter((milestone: Milestone) =>
        milestone.backlogMilestone.name.includes('Release')
      )
    ),
  nonEmpty: () => items && items.length > 0,
  isEmpty: () => !items || items.length == 0,
  filterByIssues: (issues: List<Issue>) => {
    const filtered = items.map((item: Milestone) => {
      const milestoneIssues = issues.filter(
        (issue: Issue) =>
          issue.milestones.findIndex(
            (milestone) => item.backlogMilestone.id == milestone.id
          ) != -1
      );
      return Milestone(item.backlogMilestone, sumPoint(milestoneIssues));
    });
    return Milestones(filtered);
  },
  getGraphLines: (releases: Releases) => {
    let latest = 0;
    let sum = 0;
    const results = Milestones(items)
      .sortByDate()
      .items.map((milestone: Milestone) => {
        let item = {
          name: dateString(milestone.backlogMilestone.releaseDueDate),
        };
        const current = milestone.totalPoint;
        if (current > 0) {
          latest = current;
          sum = sum + current;
        } else {
          sum = sum + latest;
        }
        releases.items.map((release: Milestone) => {
          item[release.backlogMilestone.name] = release.totalPoint;
          item['forecast'] = sum;
        });
        return item;
      });
    return results;
  },
});

export interface Releases {
  readonly items: List<Milestone>;
  getHorizontalLines: (startDate: Date) => any;
}
export const Releases = (items: List<Milestone>): Releases => ({
  items,
  getHorizontalLines: (startDate: Date) => {
    let item = {};
    item['name'] = dateString(startDate);
    items.map((release: Milestone) => {
      item[release.backlogMilestone.name] = release.totalPoint.toString();
      item['forecast'] = 0;
    });
    return item;
  },
});
