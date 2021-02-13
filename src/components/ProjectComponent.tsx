import { useEffect, useState } from 'react';
import { Project } from '../datas';
import { fetchProjectInfo } from '../network/BacklogAPI';

interface Props {
  readonly projectKey: string;
  readonly setProjectId: (e: number) => void;
}

export const ProjectComponent = (props: Props): JSX.Element => {
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
