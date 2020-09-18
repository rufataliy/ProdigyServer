import React from "react";

import {
  CTabs,
  CNav,
  CTabPane,
  CTabContent,
  CNavItem,
  CNavLink,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import Icon from "./_Icon.jsx";

const _Tabs = ({ items, edit, remove, userId }) => {
  // props.items[0]._id return error of cannot read property of undefined
  return (
    <CTabs
      unmountOnExit
      id="left-tabs-example"
      defaultActiveKey={items[0] && items[0]._id}
    >
      <CContainer fluid>
        <CRow>
          <CCol sm={3}>
            <CNav variant="tabs" className="flex-column">
              {items &&
                items.map((item) => {
                  return (
                    <CNavItem>
                      <CNavLink eventKey={item._id}>{item.title}</CNavLink>
                    </CNavItem>
                  );
                })}
            </CNav>
          </CCol>
          <CCol className="side-borders p-0" sm={9}>
            <CTabContent className="position-relative ">
              {items &&
                items.map((item) => {
                  const readOnly = item.author !== userId;
                  return (
                    <React.Fragment>
                      <CTabPane key={item._id} eventKey={item._id}>
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
                      </CTabPane>
                    </React.Fragment>
                  );
                })}
            </CTabContent>
          </CCol>
        </CRow>
      </CContainer>
    </CTabs>
  );
};
export default _Tabs;
