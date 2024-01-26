import { useSearchParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

export default function Pager({ allProducts, itemsPerPage }) {

  const [searchParam, setSearchParam] = useSearchParams();
  let currentPage = Number(searchParam.get("page"));
  if (!currentPage) currentPage = 1;
  const totalPages = Math.ceil(allProducts / itemsPerPage);
  const pageStep = {
    prev4: currentPage - 4,
    prev3: currentPage - 3,
    prev2: currentPage - 2,
    prev1: currentPage - 1,
    next1: currentPage + 1,
    next2: currentPage + 2,
    next3: currentPage + 3,
    next4: currentPage + 4
  }

  function toPrevPage() {
    if(currentPage > 1) searchParam.set("page", pageStep.prev1); //
    setSearchParam(searchParam);
  }
  function toNextPage() {
    if(totalPages > currentPage) searchParam.set("page", pageStep.next1);
    setSearchParam(searchParam);
  }

  function toPageNum(value)  {
      if(currentPage >= 1 && currentPage <= totalPages) searchParam.set("page", value)
      setSearchParam(searchParam)
    }

  return (
    (
      totalPages > 1 &&
    <div className="col-12 justify-content-center">
        <Pagination className="justify-content-center">
      {currentPage > 1 && <Pagination.Prev  key={'prev'} onClick={toPrevPage} />}
      {currentPage == 1 || <Pagination.Item key={1} onClick={() => toPageNum(1)}>1</Pagination.Item>}
      {pageStep.prev4 > 1  && <Pagination.Ellipsis disabled />}
      {pageStep.prev3 > 1 && <Pagination.Item key={pageStep.prev3} onClick={() => toPageNum(pageStep.prev3)}>{pageStep.prev3}</Pagination.Item>}
      {pageStep.prev2 > 1 && <Pagination.Item key={pageStep.prev2} onClick={() => toPageNum(pageStep.prev2)}>{pageStep.prev2}</Pagination.Item>}
      {pageStep.prev1 > 1 && <Pagination.Item key={pageStep.prev1} onClick={() => toPageNum(pageStep.prev1)}>{pageStep.prev1}</Pagination.Item>}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {pageStep.next1 < totalPages && <Pagination.Item key={pageStep.next1} onClick={() => toPageNum(pageStep.next1)}>{pageStep.next1}</Pagination.Item>}
      {pageStep.next2 < totalPages && <Pagination.Item key={pageStep.next2} onClick={() => toPageNum(pageStep.next2)}>{pageStep.next2}</Pagination.Item>}
      {pageStep.next3 < totalPages && <Pagination.Item key={pageStep.next3} onClick={() => toPageNum(pageStep.next3)}>{pageStep.next3}</Pagination.Item>}
      {pageStep.next4 < totalPages && <Pagination.Ellipsis disabled />}
      {currentPage == totalPages || totalPages > 1 && <Pagination.Item onClick={() => toPageNum(totalPages)}>{totalPages}</Pagination.Item>}
      {currentPage < totalPages && totalPages > 1 && <Pagination.Next key={'next'} onClick={toNextPage} />}
      </Pagination>
    </div>
    )
  );


}
