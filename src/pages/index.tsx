import { Layout } from '@components/Layout';
import { Box, Typography } from '@mui/material';

const navLinks = [
  {
    title: 'Global Alignment',
    href: '#',
  },
  {
    title: 'Local Alignment',
    href: '#',
  },
];

const Home = () => {
  return (
    <Layout navLinks={navLinks}>
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='50vh'>
        <Typography variant='h1'>
          Sequence
          <Box sx={{ color: 'primary.main', display: 'inline' }}> Alignment</Box>
        </Typography>
      </Box>
    </Layout>
  );
}

export default Home;
