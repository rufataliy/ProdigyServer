import React from "react";

const _Tabs = ({ items }) => (
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          {items
            ? items.map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item._id}>{item.title}</Nav.Link>
                  </Nav.Item>
                );
              })
            : ""}
        </Nav>
      </Col>
      <Col sm={9}>
        {items
          ? items.map((item) => {
              return (
                <Tab.Content>
                  <Tab.Pane eventKey={item._id}>{item.text}</Tab.Pane>
                </Tab.Content>
              );
            })
          : ""}
      </Col>
    </Row>
  </Tab.Container>
);
export default _Tabs;
