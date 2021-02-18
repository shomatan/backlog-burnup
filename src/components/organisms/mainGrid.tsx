import React, { useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import * as Icon from '../atom/icon';
import { Box, TextField } from '@material-ui/core';

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
  cursor: 'pointer',
  color: '#59B6A7',
});

const AddPanelInner = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: '#439e8f',
  },
});

const Config = styled.div({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: 30,
});

const ConfigForm = styled.div({
  width: '100%',
  height: '100%',
});

const CloseIcon = css({
  position: 'absolute',
  top: 8,
  right: 8,
});

export const MainGrid = (): JSX.Element => {
  const [state, setState] = useState(null);

  return (
    <Grid>
      <Panel></Panel>
      <AddPanel>
        {state ? (
          <Config>
            <Icon.Close css={CloseIcon} onClick={() => setState(!state)} />
            <ConfigForm>
              <Box>https://</Box>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="url"
                label="Backlog URL"
                name="url"
                autoComplete="url"
                autoFocus
              />
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
