import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = (props) => {
    return(
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={props.onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={props.page}
        />
    )
}

export default Paginate;