import React from "react";
import Loading from "./_Loading.jsx";
import ListItem from "./_ListItem.jsx";
import RoundedBtn from "./_RoundedBtn.jsx";
const _List = ({
  items,
  createItem,
  editItem,
  deleteItem,
  Component,
  fetching,
  listName,
}) => {
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">{listName} </h3>
        <RoundedBtn onClick={createItem} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && items
          ? items.map((item) => (
              <Component
                path={listName}
                editItem={editItem}
                deleteItem={deleteItem}
                key={item._id}
                item={item}
              />
            ))
          : fetching && <Loading />}
      </div>
    </React.Fragment>
  );
};
export default _List;
