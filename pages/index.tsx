import React from 'react';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 480,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Home = (): JSX.Element => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className="container">
      <Head>
        <title>Backlog Burn Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h1" variant="h5">
                  STEP1:
                </Typography>
                <form className={classes.form} noValidate>
                  https://
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="url"
                    label="Backlog URL"
                    name="url"
                    autoComplete="url"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="key"
                    label="API Key"
                    type="password"
                    id="key"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Get Backlog data
                  </Button>
                </form>
              </Paper>
            </Grid>
            {/* Config */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h1" variant="h5">
                  STEP2:
                </Typography>
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
            </Grid>
          </Grid>
        </Container>
        <div className={classes.paper}></div>
      </body>
    </div>
  );
};

export default Home;
