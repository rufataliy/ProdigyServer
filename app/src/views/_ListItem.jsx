import React from "react";
import {
  CCard,
  CCardTitle,
  CCardHeader,
  CCardBody,
  CCardSubtitle,
  CCardText,
  CCardFooter,
} from "@coreui/react";
import { Link } from "react-router-dom";
import Icon from "./_Icon.jsx";
import { useRouteMatch } from "react-router-dom";

const _Item = ({ item, editItem, deleteItem, readOnly, childRoute }) => {
  const { url } = useRouteMatch();

  return (
    <CCard className="mr-3 mb-3" style={{ width: "200px", height: "200px" }}>
      <CCardHeader>
        <CCardTitle tag="h5">{item.title}</CCardTitle>
      </CCardHeader>
      <CCardBody className="d-flex justify-content-between flex-column">
        <div>
          <CCardSubtitle className="mb-2 text-muted">
            {item.level}
          </CCardSubtitle>
          <CCardText>{item.description}</CCardText>
        </div>
      </CCardBody>
      <CCardFooter>
        <div>
          <Link
            to={(location) => ({
              pathname: `${url}/${item._id}/${childRoute}`,
              state: {
                extendable: !readOnly,
              },
            })}
          >
            {childRoute}
          </Link>
          {!readOnly && (
            <>
              <Icon
                onClick={() => editItem(item)}
                className="ml-3 fas fa-pen"
              />
              <Icon
                onClick={() => deleteItem(item)}
                className="ml-3 fas fa-trash"
              />
            </>
          )}
        </div>
      </CCardFooter>
    </CCard>
  );
};

export default React.memo(_Item);
