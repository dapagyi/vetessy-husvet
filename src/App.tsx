import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import border from './border_purple.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Border } from './components/Border/Border';
// import { HashRouter as Router, , Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography/Typography';
import PageComponent from './components/Page/Page';

import { Homepage, Page } from './interfaces/IPage';

const App: React.FC = () => {
  const [homepage, setHomepage] = React.useState<Homepage>({ title: '', youtubeLink: '', backgroundLink: '' });
  const [pages, setPages] = React.useState<Page[]>([]);

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

    const query = `select A, B, C, D where A is not null offset 1`;
    fetch(
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tq=${window.encodeURIComponent(
        query,
      )}&gid=${SHEET_ID}&headers=1`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        const regExp = /{.*}/;
        const r = regExp.exec(result);
        if (r != null) {
          const json = JSON.parse(r[0] || '{ table: { rows: [] } }');
          setHomepage({
            title: json.table.rows[0].c[0].v,
            youtubeLink: json.table.rows[0].c[2].v,
            backgroundLink: json.table.rows[0].c[3].v,
          });
          // setVideoLink(json.table.rows[0].c[1].v);
          const pages: Page[] = json.table.rows.slice(1).map(
            (row: Row): Page => ({
              title: row.c[0].v,
              quote: row.c[1].v,
              youtubeLink: row.c[2].v,
              backgroundLink: row.c[3].v,
            }),
          );
          // console.log(pages);
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
        <Switch>
          <Route exact path="/">
            <PageComponent page={homepage}>
              <Typography variant="h5" align="left" color="textSecondary">
                {pages.map((page, index) => {
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
            </PageComponent>
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
                <PageComponent page={page}>
                  <Typography variant="body1" gutterBottom align="center">
                    {page.quote}
                    <br />
                  </Typography>
                </PageComponent>
              </Route>
            );
          })}
          <Route></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
