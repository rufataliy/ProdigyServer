import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import _SideBar from "../views/_SideBar.jsx";
import Schedule from "./Schedule/Schedule.jsx";
import LessonHome from "./Lesson/LessonHome.jsx";
import Home from "./Home/Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VocabularyHome from "./Vocabulary/VocabularyHome.jsx";
import api from "../api/api";
import Chat from "./Chat/Chat.jsx";
import Modal from "./Modal.jsx";
import ProgramHome from "./Programs/ProgramHome.jsx";
import { links } from "../utils/links.js";
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
        <Router>
          <Container fluid>
            <Row bsPrefix={"row flex-nowrap overflow-hidden"}>
              <Col bsPrefix={"col-auto p-0"}>
                <_SideBar links={links} />
              </Col>
              <Col
                bsPrefix={"col-auto min-vh-100 col-12 col-md-9 mx-auto pt-4 "}
              >
                <Switch>
                  <Route exact path="/app" component={Home} />
                  <Context.Provider value={store}>
                    <Route path="/app/Schedule" component={Schedule} />
                    <Route path="/app/Vocabulary" component={VocabularyHome} />
                    {/* <Route path="/app/Program/" component={ProgramHome} /> */}
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
