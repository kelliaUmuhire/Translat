import React, {useState} from 'react';
import { Page } from 'react-pdf';
import { Document} from 'react-pdf/dist/esm/entry.webpack';

// import styled from '@react-pdf/styled-components';

// import samplePDF from './JustMercy.pdf';
// require(this.props.location.state.detail);

// const Heading = styled.Text`
//   margin: 10px;
//   font-size: 22px;
//   font-family: 'Helvetica';
// `;

const ReadBook = (props) =>{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const loc = props.location.state.book;
  console.log(loc)
  return (
    <div style={{ border: '2rem'}}>
      <div className="main" style={{ marginLeft: '5rem', paddingLeft: '5rem', paddingRight: '1px', marginTop: '5rem', paddingTop: '5rem', paddingBottom: '2rem'}} className="shadow bg-white rounded text-center">
      <Document
        file={loc}
        onLoadSuccess={onDocumentLoadSuccess}
        
      >
        <Page pageNumber={pageNumber}>
          {/* <Heading>
            D' oh!
          </Heading> */}
        </Page>
      </Document>
      <div className="text-center" style={{marginRight: '18.5rem'}}>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
      </div>
      </div>
  );
}

export default ReadBook;