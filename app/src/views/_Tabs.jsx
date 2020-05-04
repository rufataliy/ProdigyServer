import React from "react";
import { Tab, Row, Col, Container, Nav } from "react-bootstrap";
import Icon from "./_Icon.jsx";
const _Tabs = (props) => {
  // props.items[0]._id return error of cannot read property of undefined
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={props.items[0] && props.items[0]._id}
    >
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {props.items &&
                props.items.map((item) => {
                  return (
                    <Nav.Item>
                      <Nav.Link eventKey={item._id}>{item.title}</Nav.Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
          </Col>
          <Col className="left-border p-0" sm={9}>
            <Tab.Content className="position-relative ">
              {props.items &&
                props.items.map((item) => {
                  return (
                    <React.Fragment>
                      <Tab.Pane key={item._id} eventKey={item._id}>
                        <div
                          className="section-content p-3"
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        ></div>
                        <div className="section-buttons-box">
                          <Icon
                            onClick={() => props.editSection(item)}
                            className="ml-3 fas fa-pen"
                          />
                          <Icon
                            onClick={() => props.editSection(item)}
                            className="ml-3 fas fa-trash"
                          />
                        </div>
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
