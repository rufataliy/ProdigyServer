import React from "react";
import { Tab, Row, Col, Container, Nav } from "react-bootstrap";
const _Tabs = (props) => {
  // props.items[0]._id return error of cannot read property of undefined
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={props.items[0] && props.items[0]._id}
    >
      <Container>
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
          <Col sm={9}>
            <Tab.Content>
              {props.items &&
                props.items.map((item) => {
                  return (
                    <Tab.Pane
                      dangerouslySetInnerHTML={{ __html: item.text }}
                      eventKey={item._id}
                    ></Tab.Pane>
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
