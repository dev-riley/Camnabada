import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://i6c109.p.ssafy.io:3000">
        CAM:NABADA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;