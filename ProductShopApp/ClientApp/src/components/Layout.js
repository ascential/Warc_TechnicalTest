import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

const year = () => {
  const d = new Date();
  return d.getFullYear();
};

export const Layout = ({children}) => {
    return (
      <div>
        <NavMenu />
        <Container className="body-content">
          {children}
          <hr />
          <footer>
            <p>&copy;{`${year()} Product Shop`}</p>
          </footer>
        </Container>
      </div>
    );
}
