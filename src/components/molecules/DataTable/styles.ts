import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type styleProps = {
  striped: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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
