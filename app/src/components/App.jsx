import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import _SideBar from "../views/_SideBar.jsx";
import Schedule from "./Schedule.jsx";
import LessonHome from "./LessonHome.jsx";
import Home from "./Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { browserHistory } from "react-router";
import VocabularyHome from "./VocabularyHome.jsx";
import api from "../api/api";
import Chat from "./Chat/Chat.jsx";
import Modal from "./Modal.jsx";
const App = () => {
  const store = useGlobalState();
  const {
    compUpdate,
    modalState,
    vocabState,
    toggleModal,
    actions,
    appState,
  } = store;
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
    <React.Fragment>
      {console.log("rendered app")}
      <Context.Provider value={store}>
        <Modal title="New word" />
      </Context.Provider>
      <Context.Provider value={appState}>
        <TopNav />
        {appState.author && renderChat()}
      </Context.Provider>
      <div className="main">
        <Router history={browserHistory}>
          <Container fluid>
            <Row bsPrefix={"row flex-nowrap overflow-hidden"}>
              <Col bsPrefix={"col-auto p-0"}>
                <_SideBar />
              </Col>
              <Col bsPrefix={"col-auto min-vh-100 col-md-9 mx-auto pt-4 "}>
                <Switch>
                  <Route path="/app" exact component={Home} />
                  <Context.Provider value={store}>
                    <Route path="/app/Schedule" component={Schedule} />
                    <Route path="/app/Vocabulary" component={VocabularyHome} />
                    <Route path="/app/Lesson" component={LessonHome} />
                  </Context.Provider>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    </React.Fragment>
  );
};

export default React.memo(App);
