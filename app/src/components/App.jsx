import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LessonHome from "./Lesson/LessonHome.jsx";
import ProgramHome from "./Programs/ProgramHome.jsx";
import VocabularyHome from "./Vocabulary/VocabularyHome.jsx";
import Home from "./Home/Home.jsx";
import Chat from "./Chat/Chat.jsx";
import api from "../api/api";
import Modal from "./Modal/Modal.jsx";
import SocketProvider from "../store/SocketProvider";
import { Layout } from "../layout";
import Loading from "../views/_Loading.jsx";
import useGlobalState, { APP } from "../store/useGlobalState";
import Context from "../store/context";
import "./style/main.scss";

const Schedule = React.lazy(() => import("./Schedule/Schedule.jsx"));

const renderChat = () => (
  <SocketProvider>
    <Chat />
  </SocketProvider>
);

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

  return (
    <Router>
      <Context.Provider value={store}>
        {appState.author && renderChat()}
        <Modal />
        <Layout>
          <Switch>
            <Route exact path="/app" component={Home} />
            <Route
              path="/logout"
              component={() => {
                window.location.href = "/logout";
                return null;
              }}
            />
            <Route path="/app/klasses">
              <Suspense fallback={<Loading />}>
                <Schedule />
              </Suspense>
            </Route>
            <Route path="/app/vocabularies" component={VocabularyHome} />
            <Route path="/app/programs" component={ProgramHome} />
            <Route path="/app/lessons" component={LessonHome} />
          </Switch>
        </Layout>
      </Context.Provider>
    </Router>
  );
};

export default React.memo(App);
