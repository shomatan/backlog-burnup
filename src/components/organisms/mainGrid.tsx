import React, { useState, useEffect } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as Icon from '../atom/icon';
import { Box, TextField, Select, MenuItem } from '@material-ui/core';
import * as Buttons from '../atom/buttons';
import {
  fetchProjectsList,
  fetchIssueType,
  fetchMilestones,
} from '../../network/BacklogAPI';
import { IssueType, dateString, BacklogMilestone } from '../../datas';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { Overlay } from './overlay';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 40,
});

const Panel = styled.div({
  position: 'relative',
  boxShadow: '0 0 30px rgb(0, 0, 0, 0.1)',
  borderRadius: 10,
  height: 350,
  background: '#fff',
  padding: '20px 50px 20px 30px',
});

const EllipsisIcon = css({
  position: 'absolute',
  top: 14,
  right: 20,
  cursor: 'pointer',
})

const AddPanel = styled.div({
  display: 'flex',
  // background: '#F3F3F3',
  background: '#fff',
  borderRadius: 10,
  color: '#59B6A7',
  height: 350,
  boxShadow: '0 0 30px rgb(0, 0, 0, 0.1)',
});

const AddPanelInner = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: '#439e8f',
  },
});

const Config = styled.div({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '20px 50px 20px 30px',
});

const ConfigForm = styled.div({
  width: '100%',
});

const CloseIcon = css({
  position: 'absolute',
  top: 16,
  right: 16,
  cursor: 'pointer',
});

const Space = styled.div({
  display: 'grid',
  gridTemplateColumns: '90px 1fr 100px',
  alignItems: 'center',
});

const ConfigFormItem = styled.div({
  display: 'grid',
  gridTemplateColumns: '90px 1fr',
  alignItems: 'center',
  marginTop: 10,
});

export const MainGrid = (): JSX.Element => {
  const [toggleState, setToggle] = React.useState(null);
  const [chartState, setChartState] = React.useState([]);
  const [formData, setFormData] = React.useState(null);
  const [spaceUrl, setSpaceUrl] = React.useState('');
  const [ApiKey, setApiKey] = React.useState('');
  const [projecsList, setProjecsList] = React.useState([]);
  const [projectId, setProjectId] = React.useState(0);
  const [issueTypeList, setIssueTypeList] = React.useState<
    ReadonlyArray<IssueType>
  >(null);
  const [issueType, setIssueType] = React.useState(0);
  const [milestoneList, setMilestoneList] = React.useState(null);
  // const [milestoneItem, setMilestoneItem] = React.useState(0);
  // const [release, setRelease] = React.useState(null);
  const [projectStartDate, setProjectStartDate] = useState<Date>(null);
  const [overlayState, setOverlayState] = useState(false)

  useEffect(() => {
    // for dev
    // if (process.env.BACKLOG_URL) setSpaceUrl(process.env.BACKLOG_URL);
    // if (process.env.BACKLOG_API_KEY) setApiKey(process.env.BACKLOG_API_KEY);

    if (!spaceUrl || !ApiKey) return;
    (async () => {
      const p = await fetchProjectsList(spaceUrl, ApiKey);

      setProjecsList(p.filter((v) => v.archived === false));
    })();
  }, [spaceUrl, ApiKey, projectId]);

  useEffect(() => {
    if (projectId) {
      (async () => {
        const i = await fetchIssueType(
          projecsList.find((p) => p.id === projectId).projectKey
        );
        setIssueTypeList(i);
        const m = await fetchMilestones(
          projecsList.find((p) => p.id === projectId).projectKey
        );
        setMilestoneList(m);
      })();
    }
  }, [projectId, issueType]);

  const changeProject = (event) => {
    setProjectId(event.target.value);
  };

  const changeIssueType = (event) => {
    setIssueType(event.target.value);
  };

  const toggleOverlay = (state) => {
    setOverlayState(state);
  }

  // const changeMilestone = (event) => {
  //   setMilestoneItem(event.target.value);
  // };

  const ClickApply = (formData) => {
    // clear state when update chart data

    // setFormData(formData);
    // console.log('milestoneList:', milestoneList);
    setSpaceUrl('');
    setApiKey('');
    setProjectId(0);
    setIssueType(0);
    setChartState(chartState.concat(formData));
  };

  return (
    <>
    <Grid>
      {chartState.map((v, index) => {
        return chartState ? (
          <Panel key={index}>
            <Icon.Ellipsis
              css={EllipsisIcon}
              onClick={() => toggleOverlay(!overlayState)}
            />
            <ResponsiveContainer>
              <LineChart
                width={600}
                height={300}
                data={v}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
                {(() => {
                  return milestoneList.items.map((release) => {
                    console.log('release:', release);
                    <Line
                      type="monotone"
                      dataKey={release.backlogMilestone.name}
                    />;
                  });
                })()}
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        ) : null;
      })}
      <AddPanel>
        {toggleState ? (
          <Config>
            <Icon.Close
              css={CloseIcon}
              onClick={() => setToggle(!toggleState)}
            />
            <ConfigForm>
              <Space>
                <Box>https://</Box>
                <TextField
                  variant="standard"
                  margin="none"
                  required
                  id="url"
                  label="Backlog URL"
                  name="url"
                  autoComplete="url"
                  autoFocus
                  value={spaceUrl}
                  onChange={(e) => setSpaceUrl(e.target.value)}
                />
                <Box>.backlog.com</Box>
              </Space>
              <ConfigFormItem>
                <Box>API Key</Box>
                <TextField
                  variant="standard"
                  margin="none"
                  required
                  id="apiKey"
                  label="API Key"
                  name="apiKey"
                  autoComplete="apiKey"
                  value={ApiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                  }}
                />
              </ConfigFormItem>
              {spaceUrl && ApiKey ? (
                <ConfigFormItem>
                  <Box>Project</Box>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projectId}
                    onChange={changeProject}
                  >
                    {projecsList
                      ? projecsList.map((data) => {
                          return (
                            <MenuItem key={data.id} value={data.id}>
                              {data.name}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </ConfigFormItem>
              ) : null}

              {spaceUrl && ApiKey && projectId ? (
                <>
                  <ConfigFormItem>
                    <Box>Issue Type</Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={issueType}
                      onChange={changeIssueType}
                    >
                      {issueTypeList
                        ? issueTypeList.map((data) => {
                            return (
                              <MenuItem key={data.id} value={data.id}>
                                {data.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </ConfigFormItem>

                  {/* <ConfigFormItem>
                    <Box>Milestone</Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // multiple
                      value={milestoneItem}
                      onChange={changeMilestone}
                    >
                      {milestoneList
                        ? milestoneList.map((data) => {
                            return (
                              <MenuItem key={data.id} value={data.id}>
                                {data.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </ConfigFormItem> */}
                </>
              ) : null}

              {issueType ? (
                <Buttons.Button
                  color={Buttons.Color.primary}
                  variant={Buttons.Variant.contained}
                  onClick={() =>
                    ClickApply({
                      spaceUrl: spaceUrl,
                      ApiKey: ApiKey,
                      projectId: projectId,
                      issueType: issueType,
                    })
                  }
                >
                  Add
                </Buttons.Button>
              ) : null}
            </ConfigForm>
          </Config>
        ) : (
          <AddPanelInner onClick={() => setToggle(!toggleState)}>
            <Icon.Add />
          </AddPanelInner>
        )}
      </AddPanel>
    </Grid>
    <Overlay enable={overlayState} onClick={() => toggleOverlay(!overlayState)}>
      <ConfigForm>
        <Space>
          <Box>https://</Box>
          <TextField
            variant="standard"
            margin="none"
            required
            id="url"
            label="Backlog URL"
            name="url"
            autoComplete="url"
            autoFocus
            value={spaceUrl}
            onChange={(e) => setSpaceUrl(e.target.value)}
          />
          <Box>.backlog.com</Box>
        </Space>
        <ConfigFormItem>
          <Box>API Key</Box>
          <TextField
            variant="standard"
            margin="none"
            required
            id="apiKey"
            label="API Key"
            name="apiKey"
            autoComplete="apiKey"
            value={ApiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
          />
        </ConfigFormItem>
        {spaceUrl && ApiKey ? (
          <ConfigFormItem>
            <Box>Project</Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectId}
              onChange={changeProject}
            >
              {projecsList
                ? projecsList.map((data) => {
                    return (
                      <MenuItem key={data.id} value={data.id}>
                        {data.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </ConfigFormItem>
        ) : null}
        {spaceUrl && ApiKey && projectId ? (
          <>
            <ConfigFormItem>
              <Box>Issue Type</Box>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={issueType}
                onChange={changeIssueType}
              >
                {issueTypeList
                  ? issueTypeList.map((data) => {
                      return (
                        <MenuItem key={data.id} value={data.id}>
                          {data.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </ConfigFormItem>
          </>
        ) : null}
      </ConfigForm>
    </Overlay>
    </>
  );
};

export default MainGrid;
