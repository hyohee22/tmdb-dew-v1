import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";

const AppLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/login";

  const [keyword, setkeyword] = useState('');
  const navigata = useNavigate("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim() !== ''){
      navigata('/movies?keyword=${keyword');
      setkeyword('')
    }
  }
  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/">Movie 306</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" id="navbar-toggler" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/mypage">My Page</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control type="search" placeholder="영화를 검색하세요." className="me-2" aria-label="Search" value={keyword}
              onChange={(e) => setkeyword(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Outlet />
      </main>

      {!hideFooter && (
        <footer style={{ backgroundColor: "#111", color: "#fff", padding: "20px 0", marginTop: "50px" }}>
          <Container>
            <p className="text-center">© 2025 Movie 306 — Stories Beyond the Screen</p>
          </Container>
        </footer>
      )}
    </div>
  );
};

export default AppLayout;
