import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
	const { onServiceChange } = props;
	return (
		<div className="header d-flex">
			<h3>
				<Link to="/">Star DB</Link>
			</h3>
			<ul className="d-flex">
				<li>
					<Link to="/people/">People</Link>
				</li>
				<li>
					<Link to="/planets/">Planets</Link>
				</li>
				<li>
					<Link to="/starships/">Starships</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/secret">Secret</Link>
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
