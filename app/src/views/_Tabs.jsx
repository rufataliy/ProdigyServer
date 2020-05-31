import React from "react";
import { Tab, Row, Col, Container, Nav } from "react-bootstrap";
import Icon from "./_Icon.jsx";

const _Tabs = ({ items, edit, remove, userId }) => {
  // props.items[0]._id return error of cannot read property of undefined
  return (
    <Tab.Container
      unmountOnExit
      id="left-tabs-example"
      defaultActiveKey={items[0] && items[0]._id}
    >
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Nav variant="tabs" className="flex-column">
              {items &&
                items.map((item) => {
                  return (
                    <Nav.Item>
                      <Nav.Link eventKey={item._id}>{item.title}</Nav.Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
          </Col>
          <Col className="side-borders p-0" sm={9}>
            <Tab.Content className="position-relative ">
              {items &&
                items.map((item) => {
                  const readOnly = item.author !== userId;
                  return (
                    <React.Fragment>
                      <Tab.Pane key={item._id} eventKey={item._id}>
                        <div
                          className="section-content p-3"
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        ></div>
                        {!readOnly && (
                          <div className="section-buttons-box">
                            <Icon
                              onClick={() => edit(item)}
                              className="ml-3 fas fa-pen"
                            />
                            <Icon
                              onClick={() => remove(item)}
                              className="ml-3 fas fa-trash"
                            />
                          </div>
                        )}
                      </Tab.Pane>
                    </React.Fragment>
                  );
                })}
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </Tab.Container>
  );
};
export default _Tabs;
