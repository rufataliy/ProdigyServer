import React from "react";
import Loading from "./_Loading.jsx";
import RoundedBtn from "./_RoundedBtn.jsx";

const _List = ({
  items,
  createItem,
  editItem,
  Component,
  fetching,
  listName,
  childRoute,
}) => {
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">{listName}</h3>
        <RoundedBtn onClick={createItem} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && items
          ? items.map((item) => (
              <Component
                path={listName}
                editItem={editItem}
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
export default _List;
