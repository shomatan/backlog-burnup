import React, { useState, useEffect } from 'react';
import { IssuesComponent } from '../src/components/IssuesComponent';
import { IssueTypesComponent } from '../src/components/IssueTypesComponent';
import { MilestonesComponent } from '../src/components/MilestonesComponent';
import { ProjectComponent } from '../src/components/ProjectComponent';
import { fetchIssuesOfIssueType } from '../src/network/BacklogAPI';

const Test = (): JSX.Element => {
  const [projectId, setProjectId] = useState(null);
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issues, setIssues] = useState(null);

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
      setIssues(await fetchIssuesOfIssueType(projectId, id));
    }
  };

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
      <MilestonesComponent projectKey={projectKey} issues={issues} />
      <IssuesComponent issues={issues} />
    </div>
  );
};

export default Test;
