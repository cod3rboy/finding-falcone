import React, { useContext, useEffect, useState } from "react";

const pageContext = React.createContext();

function PageSwitch(props) {
	const [page, setPage] = useState(props.entry ?? "");
	const targetPage = props.children.find(
		(child) => child.props.name === page
	);

	const handlePageChanged = (event) => {
		setPage(event.detail);
	};
	useEffect(() => {
		window.addEventListener("pagechange", handlePageChanged);
		return () => {
			window.removeEventListener("pagechange", handlePageChanged);
		};
	}, []);

	return (
		<pageContext.Provider value={page}>
			{targetPage ?? <></>}
		</pageContext.Provider>
	);
}

export function useCurrentPage() {
	const page = useContext(pageContext);
	const changePage = (pageName) => {
		window.dispatchEvent(
			new CustomEvent("pagechange", {
				detail: pageName,
			})
		);
	};
	return [page, changePage];
}

export default PageSwitch;
