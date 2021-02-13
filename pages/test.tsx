import { useState, useEffect } from 'react';

const fetchMilestones = (projectKey: string): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/versions`);

const fetchBacklog = (endpoint: string): Promise<Response> =>
  fetch(
    `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`
  );

const Test = (): JSX.Element => {
  /* console.dir(res.json()); */
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchMilestones(process.env.BACKLOG_PROJECT_KEY);
      const json = await res.json();

      console.dir(json);
      setMilestones(json);

      /* if (!didCancel) setMessage(res); */
    })();
  }, [milestones]);

  return <div>{milestones}</div>;
};

export default Test;
