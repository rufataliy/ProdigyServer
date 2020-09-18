import React from "react";
import Loading from "./_Loading.jsx";
import RoundedBtn from "./_RoundedBtn.jsx";
import { useAppState } from "../store/useGlobalState";

const _List = ({
  extendable,
  items,
  createItem,
  editItem,
  deleteItem,
  Component,
  fetching,
  listName,
  childRoute,
}) => {
  const [appState] = useAppState();

  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        {extendable && (
          <RoundedBtn onClick={() => createItem()} iconName="fas fa-plus" />
        )}
      </div>
      <div className="d-flex flex-wrap align-items-start justify-content-md-start justify-content-center">
        {!fetching && items
          ? items.map((item) => (
              <Component
                readOnly={item.author !== appState.author._id}
                path={listName}
                editItem={editItem}
                deleteItem={deleteItem}
                key={item._id}
                item={item}
                childRoute={childRoute}
              />
            ))
          : fetching && <Loading />}
      </div>
    </React.Fragment>
  );
};
export default React.memo(_List);
