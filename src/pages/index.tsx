import Layout from '@components/Layout';
import { Box, Typography } from '@mui/material';
import navLinks from '@constants/navLinks';

const Home = () => (
  <Layout navLinks={navLinks}>
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='50vh'>
      <Typography variant='h1'>
        Sequence
        <Box sx={{ color: 'primary.main' }}> Alignment</Box>
      </Typography>
    </Box>
  </Layout>
);

export default Home;
