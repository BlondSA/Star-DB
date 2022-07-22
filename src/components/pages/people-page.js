import React from "react";
import Row from "../row/";
import { PersonDetails, PersonList } from "../sw-components";

const PeoplePage = (props) => {
	const { match, history } = props;
	const { id } = match.params;

	return (
		<Row
			left={
				<PersonList
					onItemSelected={(idItem) => {
						history.push(idItem);
					}}
				/>
			}
			right={<PersonDetails selectedId={id} />}
		/>
	);
};

export default PeoplePage;
