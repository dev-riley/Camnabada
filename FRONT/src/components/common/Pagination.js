import React, { useState } from "react";
import Pagination from "react-js-pagination";
import '../../styles/Pagination.css'

const Paging = ({ pageNum, setPageNum, numPerPage, totalListCount }) => {
  //const [page, setPage] = useState(1);

  const handlePageChange = (pageNum) => {
    setPageNum(pageNum);
  };

  return (
    <Pagination 
      activePage={pageNum}
      itemsCountPerPage={numPerPage}
      totalItemsCount={totalListCount}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;