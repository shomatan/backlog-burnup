import React, { useState, useEffect } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as Icon from '../atom/icon';
import { Box, TextField, Select, MenuItem } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import * as Buttons from '../atom/buttons';
import {
  fetchProjectsList,
  fetchProjectInfo,
  fetchIssueType,
} from '../../network/BacklogAPI';
import { Project, IssueType } from '../../datas';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 40,
});

const Panel = styled.div({
  padding: 10,
  boxShadow: '0 0 30px rgba(0,0,0,0.15)',
  borderRadius: 8,
  minHeight: 350,
});

const AddPanel = styled.div({
  display: 'flex',
  background: '#F3F3F3',
  borderRadius: 8,
  color: '#59B6A7',
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
  const [toggleState, setToggle] = useState(null);
  // const [project, setProject] = useState(Project(0, ''));
  const [applyState, setApplyState] = useState(null);
  const [spaceUrl, setSpaceUrl] = React.useState('');
  const [ApiKey, setApiKey] = React.useState('');
  const [projectId, setProjectId] = React.useState('');
  const [issueType, setIssueType] = React.useState('');
  const [milestoneItem, setMilestoneItem] = React.useState([]);

  // const projectKey = process.env.BACKLOG_PROJECT_KEY;
  useEffect(() => {
    if (!spaceUrl || !ApiKey) return;
    // if (project.id > 0) return;
    (async () => {
      const p = await fetchProjectsList(spaceUrl, ApiKey);
      console.log('p:', p);
      // setProject(p);
      // props.setProjectId(p.id);
    })();
  }, [spaceUrl, ApiKey]);

  const changeProject = (event) => {
    setProjectId(event.target.value);
  };

  const changeIssueType = (event) => {
    setIssueType(event.target.value);
  };

  const changeMilestone = (event) => {
    setMilestoneItem(event.target.value);
  };

  const milestones = [
    { id: 1, label: 'Milestone_1' },
    { id: 2, label: 'Milestone_2' },
    { id: 3, label: 'Milestone_3' },
    { id: 4, label: 'Milestone_4' },
    { id: 5, label: 'Milestone_5' },
  ];

  const ClickApply = (formData) => {
    console.log('formData:', formData);
    setApplyState(formData);
  };

  return (
    <Grid>
      <Panel></Panel>
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
              <ConfigFormItem>
                <Box>Project</Box>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={projectId}
                  onChange={changeProject}
                >
                  <MenuItem value={10}>Project1</MenuItem>
                  <MenuItem value={20}>Project2</MenuItem>
                  <MenuItem value={30}>Project3</MenuItem>
                </Select>
              </ConfigFormItem>

              <ConfigFormItem>
                <Box>Issue Type</Box>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={issueType}
                  onChange={changeIssueType}
                >
                  <MenuItem value={10}>Issue Type1</MenuItem>
                  <MenuItem value={20}>Issue Type2</MenuItem>
                  <MenuItem value={30}>Issue Type3</MenuItem>
                </Select>
              </ConfigFormItem>

              <ConfigFormItem>
                <Box>Milestone</Box>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple
                  value={milestoneItem}
                  onChange={changeMilestone}
                  input={<Input />}
                >
                  {milestones.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.label}
                    </MenuItem>
                  ))}
                </Select>
              </ConfigFormItem>
              <Buttons.Button
                color={Buttons.Color.primary}
                variant={Buttons.Variant.contained}
                onClick={() =>
                  ClickApply({
                    spaceUrl: spaceUrl,
                    ApiKey: ApiKey,
                    projectId: projectId,
                    issueType: issueType,
                    milestoneItem: milestoneItem,
                  })
                }
              >
                Apply
              </Buttons.Button>
            </ConfigForm>
          </Config>
        ) : (
          <AddPanelInner onClick={() => setToggle(!toggleState)}>
            <Icon.Add />
          </AddPanelInner>
        )}
      </AddPanel>
    </Grid>
  );
};

export default MainGrid;
