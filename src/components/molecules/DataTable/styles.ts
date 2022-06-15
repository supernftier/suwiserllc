import { createStyles, makeStyles } from '@material-ui/core/styles';

type styleProps = {
  striped: boolean;
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    border: '1px solid black',
    minHeight: '30px',
  },
  tableHeaderCell: {
    flexShrink: 0,
  },
  tableBody: {
    display: 'column',
  },
  tableRow: {
    display: 'flex',
    '&:nth-child(odd)': {
      background: (props: styleProps) => (props?.striped ? 'gray' : 'none'),
    },
  },
  tableCell: {
    display: 'flex',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  detailItem: {
    padding: '4px',
  },
}));

export default useStyles;
