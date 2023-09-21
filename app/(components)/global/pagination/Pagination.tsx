import { Grid } from "@nextui-org/react";
import ReactPaginate from "react-paginate";

interface Pagination {
  onPageChange: (selectedItem: { selected: number }) => void;
  pageCount: number;
}

const Pagination = (props: Pagination) => {
  const { onPageChange, pageCount } = props;
  return (
    <Grid.Container gap={3}>
      <Grid xs={12} className="box-pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={onPageChange}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="data-table-paginator"
        />
      </Grid>
    </Grid.Container>
  );
};

export default Pagination;
