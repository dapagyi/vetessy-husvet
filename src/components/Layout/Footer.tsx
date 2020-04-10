import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import footernyakkendo from './zöld_nyakkendő.svg';

const useStyles = makeStyles(theme => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 3, 1, 3),
    justifyContent: 'center',
    // position: 'relative',
    // bottom: '0',
  },
  nyakkendo: {
    width: `${121}px`,
    display: 'block',
    margin: '8px auto 0 auto',
  },
}));

function Copyright(): JSX.Element {
  return (
    <Typography
      variant="overline"
      style={{ fontSize: '6px', margin: '0 auto 0 auto', display: 'block', color: '#222222' }}
      // color="textSecondary"
      align="center"
    >
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://dapagyi.github.io/">
        Apagyi Dávid {new Date().getFullYear()}
        {'.'}
      </Link>
    </Typography>
  );
}

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center">
          Varjú Barnabás
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Link color="inherit" href="mailto:kapcsolat@vetessy.hu?subject=Vetéssy húsvét">
            csapatparancsnok
          </Link>
        </Typography> */}
        <img src={footernyakkendo} className={classes.nyakkendo} alt="cserkésznyakkendő" title="Cserkésznyakkendő" />
        <Copyright />
      </footer>
    </>
  );
};

export default Footer;
