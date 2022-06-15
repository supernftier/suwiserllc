import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useStyles from './styles';

type DataItem = {
  id: string,
  customerId: string,
  projectId: string,
  timeStamp: string,
  fileTypeIndicator: string,
  fileExtension: string,
  fileSize: string,
  filename: string,
  directory: string,
  transmissionStartDate: string,
  transmissionEndDate: string,
  activeFlag: string,
  sftpFilename: string
};

type ColumnItem = {
  disablePadding?: boolean, 
  id: keyof DataItem,
  label: string,
  numeric?: boolean
};

type Order = 'asc' | 'desc';

type DataTableProps = {
  columns: Array<ColumnItem>;
  striped: boolean,
  data: Array<DataItem>;
  showSelection: boolean,
  showCollapse: boolean,
  // renderRow?: (props: DataItem) => React.ReactNode;
  // renderCell?: (props: any) => React.ReactNode;
  // renderHeader?: (props: any) => React.ReactNode;
};


interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataItem) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const DataTable = ({ columns, data, striped, showSelection, showCollapse }: DataTableProps) => {
  const styles = useStyles({
    striped,
  });

  const [order, setOrder] = useState<Order>('asc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [orderBy, setOrderBy] = useState<keyof DataItem>('customerId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DataItem,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
      (property: keyof DataItem) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
    
    return (
      <TableHead>
        <TableRow>
          {
            showCollapse && <TableCell />
          }
          {
            showSelection && 
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
          }
          {columns.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const Row = (props: { row: DataItem, isItemSelected: any, labelId: any, showCollapse: boolean }) => {
    const { row, isItemSelected, labelId, showCollapse } = props;
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow
          hover
          // onClick={(event: React.MouseEvent<unknown, MouseEvent>) => handleClick(event, row.id)}
          role={showSelection ? 'checkbox' : undefined}
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          selected={isItemSelected}
        >
          {
            showCollapse && 
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          }
          {
            showSelection && 
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={(event: React.MouseEvent<unknown, MouseEvent>) => handleClick(event, row.id)}
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>
          }
          <TableCell
            component="th"
            id={labelId}
            scope="row"
          >
            {row.id}
          </TableCell>
          <TableCell>{row.customerId}</TableCell>
          <TableCell>{row.projectId}</TableCell>
          <TableCell>{row.timeStamp}</TableCell>
          <TableCell>{row.fileExtension}</TableCell>
          <TableCell>{row.fileSize}</TableCell>
        </TableRow>
        {
          showCollapse &&
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Detail
                    </Typography>
                    <div className={styles.detailContainer}>
                      <span className={styles.detailItem}>File Name: {row.filename}</span>
                      <span className={styles.detailItem}>Directory: {row.directory}</span>
                      <span className={styles.detailItem}>Start at: {row.transmissionStartDate}</span>
                      <span className={styles.detailItem}>End at: {row.transmissionEndDate}</span>
                      <span className={styles.detailItem}>Active Flag: {row.activeFlag}</span>
                      <span className={styles.detailItem}>SFTP File Name: {row.sftpFilename}</span>
                    </div>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
        }
      </>
    );
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.slice().sort(getComparator(order, orderBy)) */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <Row key={index} row={row} isItemSelected={isItemSelected} labelId={labelId} showCollapse={showCollapse} />
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
