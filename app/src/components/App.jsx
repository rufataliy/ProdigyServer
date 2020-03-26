import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import _SideBar from "../views/_SideBar.jsx";
import Schedule from "./Schedule.jsx";
import Vocabulary from "./vocabulary.jsx";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { browserHistory } from "react-router";
import VocabularyHome from "./VocabularyHome.jsx";
import api from "../api/api";
const App = () => {
  console.log("app rerendered");
  const store = useGlobalState();

  useEffect(() => {
    const config = {
      method: "get",
      collectionName: "profile"
    };
    api(config)
      .then(user => {
        store.actions({
          type: APP,
          payload: { ...store.appState, author: user }
        });
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <Context.Provider value={store}>
        <TopNav />
        <Router history={browserHistory}>
          <Container fluid>
            <Row bsPrefix={"row flex-nowrap overflowx-hidden"}>
              <Col bsPrefix={"col-auto p-0"}>
                <_SideBar />
              </Col>
              <Col bsPrefix={"col-auto col-md-9 mx-auto pt-5 "}>
                <Switch>
                  <Route path="/app" exact component={Home} />
                  <Route path="/app/Schedule" exact component={Schedule} />
                  <Route
                    path="/app/Vocabulary"
                    exact
                    component={VocabularyHome}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </Context.Provider>
    </div>
  );
};

export default App;
