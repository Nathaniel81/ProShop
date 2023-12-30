import {Container} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
  return (
	<Navbar expand="lg" className="bg-dark" variant="dark" collapseOnSelect>
      <Container>
		<LinkContainer to='/'>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
		</LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
			<LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
			</LinkContainer>
			<LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
			</LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header