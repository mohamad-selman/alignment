import { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const NavBarBrand = ({ logo }: { logo: string }) => {
  return (
    <Box
      component='img'
      sx={{ display: 'flex', mr: 3 }}
      src={logo}
      alt='logo'
      height='60px'
    />
  );
};

interface NavLink {
  href?: string;
  title: string;
}

const NavItem = ({ link }: { link: NavLink }) => {
  return (
    <Link href={link.href || '#'} style={{ textDecoration: 'none' }} passHref>
      <Button sx={{ my: 2, color: 'primary', display: 'block' }}>
        {link.title}
      </Button>
    </Link>
  );
};

interface NavBarProps {
  children: ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <Toolbar disableGutters>
      <NavBarBrand logo='/logo.png' />
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        {children}
      </Box>
    </Toolbar>
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header>
      <AppBar position='static' sx={{ backgroundColor: 'white' }}>
        <Container maxWidth='lg'>
          {children}
        </Container>
      </AppBar>
    </header>
  );
};

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <footer>
      <Box sx={{ backgroundColor: '#F4F6F7' }}>
        <Container maxWidth='lg'>
          <Typography
            component='p'
            color='black'
            variant='caption'
            gutterBottom={false}
            align='center'
            py={4}
          >
            {children}
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

interface LayoutProps {
  children: ReactNode;
  navLinks: NavLink[];
}

export const Layout = ({ children, navLinks }: LayoutProps) => {
  return (
    <>
      <Header>
        <NavBar>
          {navLinks.map((link: NavLink, idx) => (
            <NavItem key={idx} link={link} />
          ))}
        </NavBar>
      </Header>
      <main>
        <Container component='main' maxWidth='lg' sx={{ py: 4 }}>
          {children}
        </Container>
      </main>
      <Footer>
        © {new Date().getFullYear()} <Link href='https://cs.ku.edu.kw/'>CS@KU</Link>
      </Footer>
    </>
  );
};
