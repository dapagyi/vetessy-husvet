import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography/Typography';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Border } from '../Border/Border';

import { Page, Homepage } from '../../interfaces/IPage';
import Footer from 'components/Layout/Footer';

import dvg from '../../dvg logo.svg';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2, 5),
    color: 'white',
    fontFamily: 'Patrick Hand',
    marginBottom: theme.spacing(5),
    marginTop: '0',
    fontSize: '42px',
  },
  heroContent: {
    padding: theme.spacing(3, 0, 6),
  },
  iframe: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing(5),
  },
  main: {
    flex: '1 0 auto',
    // backgroundImage: `url(${liliom})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',
  },
  dvg: {
    width: `${90}px`,
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const PageComponent: React.FC<{ page: Page | Homepage }> = props => {
  const classes = useStyles();
  return (
    <>
      <main className={classes.main} style={{ backgroundImage: `url(${props.page.backgroundLink})` }}>
        <a href="https://vetessy.hu/">
          <img
            src={dvg}
            className={classes.dvg}
            alt="121. Dr. Vetéssy Géza cserkészcsapat"
            title="121. Dr. Vetéssy Géza cserkészcsapat"
          />
        </a>
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
                >
                  {props.page.title === '' ? 'Vetéssy húsvét' : props.page.title}
                </Typography>
              </Link>
            </Border>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item md="auto">
                <iframe
                  title="YouTube"
                  // width="1903"
                  // height="759"
                  className={classes.iframe}
                  src={props.page.youtubeLink.replace(/watch\?v=/, 'embed/')}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {props.children}

                {/* <Typography variant="body1" gutterBottom align="center">
                {props.page.quote}
                <br />
              </Typography> */}
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </div>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default PageComponent;
