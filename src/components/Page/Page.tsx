import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Border } from '../Border/Border';

import Page from '../../interfaces/IPage';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 5),
    color: 'white',
    fontFamily: 'Patrick Hand',
    marginBottom: theme.spacing(5),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 6),
  },
  iframe: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing(5),
  },
}));

const PageComponent: React.FC<{ page: Page }> = ({ page }: { page: Page }) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <div className={classes.heroContent}>
          <Border backgroundColor="#158e30">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography
                className={classes.header}
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
                style={{ marginTop: '0' }}
              >
                {page.title}
              </Typography>
            </Link>
          </Border>
          <Grid container lg={12}>
            <Grid item xs></Grid>
            <Grid item md="auto" lg={6}>
              <iframe
                title="YouTube"
                // width="1903"
                // height="759"
                className={classes.iframe}
                src={page.youtubeLink.replace(/watch\?v=/, 'embed/')}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <Typography variant="body1" gutterBottom align="center">
                {page.quote}
                <br />
              </Typography>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default PageComponent;
