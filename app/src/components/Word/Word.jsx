import React, { useState } from "react";
import {
  CCard,
  CCollapse,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardFooter,
} from "@coreui/react";
import Icon from "../../views/_Icon.jsx";

const Word = ({ item, editItem, deleteItem, readOnly }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <CCard className="word mr-3 mb-3">
      <CCardHeader
        className="cursor-pointer"
        onClick={() => setCollapse(!collapse)}
      >
        <CCardTitle>{`${item.phrase}`}</CCardTitle>
      </CCardHeader>
      <CCollapse show={collapse}>
        <CCardBody>
          <p>Definition</p>
          <p className="word-text-secondary">{item.definition}</p>
          <p>Example</p>
          <p className="word-text-secondary">{item.example}</p>
        </CCardBody>
      </CCollapse>
      <CCardFooter>
        {!readOnly && (
          <div>
            <Icon
              onClick={(e) => {
                e.stopPropagation();
                editItem(item);
              }}
              className="ml-3 btn-crud fas fa-pen"
            />
            <Icon
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item);
              }}
              className="ml-3 btn-crud fas fa-trash"
            />
          </div>
        )}
      </CCardFooter>
    </CCard>
  );
};
export default React.memo(Word);
