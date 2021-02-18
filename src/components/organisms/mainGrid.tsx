import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as Icon from '../atom/icon';
import {
  Box,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import * as Buttons from '../atom/buttons';

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
  // display: 'flex',
  // flexDirection: 'column',
  width: '100%',
  // height: '100%'
});

const CloseIcon = css({
  position: 'absolute',
  top: 8,
  right: 8,
  cursor: 'pointer',
});

const Space = styled.div({
  display: 'grid',
  gridTemplateColumns: '90px 1fr 100px',
  alignItems: 'center'
})

const ConfigFormItem = styled.div({
  display: 'grid',
  gridTemplateColumns: '90px 1fr',
  alignItems: 'center',
  marginTop: 10
})

export const MainGrid = (): JSX.Element => {
  const [state, setState] = useState(null);
  const [projectId, setProjectId] = React.useState('');
  const [issueType, setIssueType] = React.useState('');
  const [milestoneItem, setMilestoneItem] = React.useState([]);

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
    'Milestone_1',
    'Milestone_2',
    'Milestone_3',
    'Milestone_4',
    'Milestone_5',
  ];

  return (
    <Grid>
      <Panel></Panel>
      <AddPanel>
        {state ? (
          <Config>
            <Icon.Close css={CloseIcon} onClick={() => setState(!state)} />
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
                />
                <Box>.backlog.com</Box>
              </Space>
              <ConfigFormItem>
                <Box>API Key</Box>
                <TextField
                  variant="standard"
                  margin="none"
                  required
                  id="url"
                  label="API Key"
                  name="url"
                  autoComplete="url"
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
                  {milestones.map((name) => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </ConfigFormItem>
              <Buttons.Button color={Buttons.Color.primary} variant={Buttons.Variant.contained}>Apply</Buttons.Button>
            </ConfigForm>
          </Config>
        ) : (
          <AddPanelInner onClick={() => setState(!state)}>
            <Icon.Add />
          </AddPanelInner>
        )}
      </AddPanel>
    </Grid>
  );
};

export default MainGrid;
