import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import _SideBar from "../views/_SideBar.jsx";
import Schedule from "./Schedule/Schedule.jsx";
import LessonHome from "./Lesson/LessonHome.jsx";
import Home from "./Home/Home.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import VocabularyHome from "./Vocabulary/VocabularyHome.jsx";
import api from "../api/api";
import Chat from "./Chat/Chat.jsx";
import Modal from "./Modal/Modal.jsx";
import ProgramHome from "./Programs/ProgramHome.jsx";
import { links } from "../utils/links.js";
import Bread from "./Bread.jsx";

const App = () => {
  const store = useGlobalState();

  const { appState } = store;
  useEffect(() => {
    const config = {
      method: "get",
      collectionName: "profile",
      endpoint: "/profile/",
    };
    api(config)
      .then((user) => {
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
      <Context.Provider value={store}>
        <Modal />
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
                {/* <Bread/> */}
                <Switch>
                  <Route exact path="/app" component={Home} />
                  <Context.Provider value={store}>
                    <Route path="/app/klasses" component={Schedule} />
                    <Route
                      path="/app/vocabularies"
                      component={VocabularyHome}
                    />
                    <Route path="/app/programs" component={ProgramHome} />
                    <Route path="/app/lessons" component={LessonHome} />
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
