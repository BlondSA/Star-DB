import React from "react";

import "./header.css";

const Header = (props) => {
    const { onServiceChange } = props;
    return (
        <div className="header d-flex">
            <h3>
                <a href="#">Star DB</a>
            </h3>
            <ul className="d-flex">
                <li>
                    <a href="#">People</a>
                </li>
                <li>
                    <a href="#">Planets</a>
                </li>
                <li>
                    <a href="#">Starships</a>
                </li>
                <li>
                    <button
                        onClick={onServiceChange}
                        className="btn btn-primary btn-sm"
                    >
                        Change Service
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Header;
