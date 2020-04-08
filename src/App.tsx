import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import border from './border_purple.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Border } from './components/Border/Border';
// import { HashRouter as Router, , Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './components/Layout/Footer';
// import RecipeList from './components/RecipeList/RecipeList';
import PageComponent from './components/Page/Page';
import Homepage from './components/Homepage/Homepage';

import liliom from './liliom_hatter.png';
import dvg from './dvg logo.svg';

import Page from './interfaces/IPage';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  main: {
    flex: '1 0 auto',
    backgroundImage: `url(${liliom})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  dvg: {
    width: `${121 + 29}px`,
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const App: React.FC = () => {
  const [pages, setPages] = React.useState<Page[]>([]);

  const classes = useStyles();

  const SPREADSHEET_ID = '1kLj4IdexWi3NdQFmjR8Lc88DV3MfZtwMiuLspNRf8gw';
  const SHEET_ID = '0';

  const fetchData = (): void => {
    const requestOptions: RequestInit = {
      method: 'GET',
      // redirect: 'follow',
    };
    interface Row {
      c: {
        v: string;
      }[];
    }

    const query = `select A, B, C where A is not null`;
    fetch(
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tq=${window.encodeURIComponent(
        query,
      )}&gid=${SHEET_ID}&headers=2`,
      requestOptions,
    )
      .then(response => {
        return response.text();
      })
      .then(result => {
        // console.log(result);
        const regExp = /{.*}/;
        const r = regExp.exec(result);
        // console.log('r: ', r);
        if (r != null) {
          const json = JSON.parse(r[0] || '{ table: { rows: [] } }');
          // console.log(json);
          const pages: Page[] = [];
          json.table.rows.map((row: Row) =>
            pages.push({
              title: row.c[0].v,
              quote: row.c[1].v,
              youtubeLink: row.c[2].v,
            }),
          );
          console.log(pages);
          setPages(pages);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CssBaseline />
      <Router basename={`/`}>
        {/* <AppBar /> */}
        <main className={classes.main}>
          <a href="https://vetessy.hu/">
            <img
              src={dvg}
              className={classes.dvg}
              alt="121. Dr. Vetéssy Géza cserkészcsapat"
              title="121. Dr. Vetéssy Géza cserkészcsapat"
            />
          </a>
          <Switch>
            <Route exact path="/">
              <Homepage pages={pages} />
            </Route>
            {pages.map((page, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={`/${page.title
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s/g, '-')}`}
                >
                  <PageComponent page={page} />
                </Route>
              );
            })}
            <Route>
              {/* <Button>asd</Button> */}
              {/* <p className={classes.main}>Ez az oldal nem létezik.</p> */}
            </Route>
          </Switch>
        </main>
      </Router>
      <Footer />
    </>
  );
};

export default App;
