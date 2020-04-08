import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import _SideBar from "../views/_SideBar.jsx";
import Schedule from "./Schedule.jsx";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { browserHistory } from "react-router";
import VocabularyHome from "./VocabularyHome.jsx";
import api from "../api/api";
import { ValidationSchemaExample } from "./test.jsx";
import ChatBox from "./ChatBox.jsx";
import Chat from "./Chat.jsx";
const App = () => {
  const store = useGlobalState();
  const { compUpdate, appState } = store;
  useEffect(() => {
    const config = {
      method: "get",
      collectionName: "profile",
    };
    api(config)
      .then((user) => {
        console.log("api call");
        store.actions({
          type: APP,
          payload: { ...store.appState, author: user },
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const renderChat = () => <Chat />;
  return (
    <div>
      {console.log("rendered app")}
      <Context.Provider value={appState}>
        <TopNav />
        {appState.author && renderChat()}
      </Context.Provider>
      <Router history={browserHistory}>
        <Container fluid>
          <Row bsPrefix={"row flex-nowrap overflowx-hidden"}>
            <Col bsPrefix={"col-auto p-0"}>
              <_SideBar />
            </Col>
            <Col bsPrefix={"col-auto col-md-9 mx-auto pt-5 "}>
              <Switch>
                <Route path="/app" exact component={Home} />
                <Context.Provider value={store}>
                  <Route path="/app/Schedule" component={Schedule} />
                  <Route path="/app/Vocabulary" component={VocabularyHome} />
                  {/* <Route path="/app/test" component={Chat} /> */}
                </Context.Provider>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
};

export default React.memo(App, (prev, next) => console.log(prev, nex));
