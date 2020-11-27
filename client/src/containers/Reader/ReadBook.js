import React, { useState } from "react";
import { Page } from "react-pdf";
// import { Page, View } from "@react-pdf/renderer";
import { Document } from "react-pdf/dist/esm/entry.webpack";

const ReadBook = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const loc = props.location.state.book;
  console.log(loc);
  return (
    <div style={{ border: "2rem", marginLeft: "10rem", width: "90%" }}>
      <div
        className="main"
        style={{
          marginLeft: "2rem",
          // width: "67%",
          // paddingLeft: "5rem",
          // paddingRight: "1px",
          marginTop: "5rem",
          width: "80%",
          // paddingTop: "5rem",
          // paddingBottom: "2rem",
        }}
        className="shadow bg-white rounded"
      >
        <Document file={loc} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber}>
            {/* <Heading>
            D' oh!
          </Heading> */}
          </Page>
        </Document>
        <div
          className="text-center"
          disabled={pageNumber >= numPages}
          style={{ marginRight: "1px", zIndex: "1999" }}
        >
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button type="button" onClick={previousPage} className="btn">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <button type="button" onClick={nextPage} className="btn">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
