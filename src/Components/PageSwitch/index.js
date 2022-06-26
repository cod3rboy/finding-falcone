import React, { useContext, useEffect, useState } from "react";

const pageContext = React.createContext();

function PageSwitch(props) {
  const { children, entry } = props;
  const hasSingleChild = !Array.isArray(children);
  const [page, setPage] = useState({ name: entry ?? "" });
  const handlePageChanged = (event) => {
    setPage({ name: event.detail.name, data: event.detail.data });
  };
  useEffect(() => {
    window.addEventListener("pagechange", handlePageChanged);
    return () => {
      window.removeEventListener("pagechange", handlePageChanged);
    };
  }, []);

  let targetPage;
  if (hasSingleChild) {
    targetPage = children;
  } else if (!page.name) {
    targetPage = children[0];
  } else {
    targetPage =
      children.find((child) => child.props.name === page.name) ?? children[0];
  }

  return <pageContext.Provider value={page}>{targetPage}</pageContext.Provider>;
}

export function useCurrentPage() {
  const { page, data } = useContext(pageContext);
  const changePage = (pageName, data) => {
    window.dispatchEvent(
      new CustomEvent("pagechange", {
        detail: {
          name: pageName,
          data: data,
        },
      })
    );
  };
  return [page, changePage, data];
}

export default PageSwitch;
