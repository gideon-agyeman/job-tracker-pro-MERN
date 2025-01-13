import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/page-wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router';
import { useAllJobsContext } from '../pages/AllJobs';

const PageButtonContainer = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useAllJobsContext();
  const { numOfPages, currentPage } = data.meta;

  //   const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePrevPage = () => {
    const prevPage = prevPage < 1 ? numOfPages : currentPage - 1;
    handlePageChange(prevPage);
  };

  const handleNextPage = () => {
    const nextPage = nextPage > numOfPages ? 1 : currentPage + 1;
    handlePageChange(nextPage);
  };

  const addPageButton = ({ pageNumber, isActive }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn page-btn ${isActive && 'active'}`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, isActive: currentPage === 1 })
    );

    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ..
        </span>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, isActive: false })
      );
    }

    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, isActive: true })
      );
    }

    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, isActive: false })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ..
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        isActive: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={handlePrevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button className="btn next-btn" onClick={handleNextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
