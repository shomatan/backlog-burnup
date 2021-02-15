import React from 'react';
import styled from '@emotion/styled';
import * as Icon from '../atom/icon'

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 40
})

const Panel = styled.div({
  padding: 10,
  boxShadow: "0 0 30px rgba(0,0,0,0.15)",
  borderRadius: 8,
  minHeight: 350
})

const AddPanel = styled.div({
  display: "flex",
  background: "#F3F3F3",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center"
})

export const MainGrid = (): JSX.Element => {
  return (
    <Grid>
      <Panel></Panel>
      <AddPanel>
        <Icon.Add />
      </AddPanel>
    </Grid>
  )
}

export default MainGrid;