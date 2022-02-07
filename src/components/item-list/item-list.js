import React from "react";
import "./item-list.css";

const ItemList = (props) => {
    const { children, data, onItemSelected } = props;

    const renderItems = (array) => {
        return array.map((item) => {
            const { id } = item;
            const label = children(item);

            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            );
        });
    };

    const items = renderItems(data);

    return <ul className="item-list list-group">{items}</ul>;
};

export default ItemList;
