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
}));

// eslint-disable-next-line react/prop-types
const Homepage: React.FC<{ pages: Array<Page> }> = ({ pages }) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <div className={classes.heroContent}>
          <Border backgroundColor="#158e30">
            <Typography
              className={classes.header}
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: '0' }}
            >
              Vetéssy húsvét
            </Typography>
          </Border>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item md="auto">
              <Typography variant="h5" align="left" color="textSecondary">
                {// eslint-disable-next-line react/prop-types
                pages.map((page, index) => {
                  return (
                    <div key={index}>
                      <Link
                        style={{
                          color: 'green',
                        }}
                        to={`/${page.title
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .replace(/\s/g, '-')}`}
                      >
                        <b>{page.title[0]}</b>
                        {page.title.slice(1)}
                      </Link>
                      <br />
                    </div>
                  );
                })}
              </Typography>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Homepage;
