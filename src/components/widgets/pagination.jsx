import React from "react";
import PropTypes from "prop-types";
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow
} from "mdbreact";

class Pagination extends React.Component {
  static propTypes = {
    selectedPage: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func.isRequired,
    lastPage: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: [1, 2, 3],
      selectedPage: this.props.selectedPage
    };
  }

  componentDidMount() {
    this.calculatePageNumbers();
  }
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.selectedPage !== this.props.selectedPage) {
      this.calculatePageNumbers();
    }
  }

  calculatePageNumbers = () => {
    let selectedPage = this.props.selectedPage;
    if (this.props.lastPage) {
      console.log("block");
      if (selectedPage > 2) {
        console.log("block 1");
        this.setState({
          pageNumbers: [selectedPage - 2, selectedPage - 1, selectedPage]
        });
        return;
      } else {
        this.setState({
          pageNumbers: [1, 2]
        });
        return;
      }
    }
    if (selectedPage > 2) {
      this.setState({
        pageNumbers: [selectedPage - 1, selectedPage, selectedPage + 1]
      });
      return;
    }
  };

  pageItemBuilder(currentPage) {
    if (this.props.selectedPage === currentPage) {
      return (
        <MDBPageItem key={currentPage}>
          <MDBPageNav className="card disabled">{currentPage}</MDBPageNav>
        </MDBPageItem>
      );
    }
    return (
      <MDBPageItem key={currentPage}>
        <MDBPageNav onClick={event => this.props.onPageSelect(currentPage)}>
          {currentPage}
        </MDBPageNav>
      </MDBPageItem>
    );
  }

  render() {
    let pages = this.state.pageNumbers.map(currentPage =>
      this.pageItemBuilder(currentPage)
    );
    return (
      <MDBRow>
        <MDBCol>
          <MDBPagination size="lg">{pages}</MDBPagination>
        </MDBCol>
      </MDBRow>
    );
  }
}

export { Pagination };
