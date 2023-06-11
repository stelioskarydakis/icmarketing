import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/usersSlice";
import { useTranslation } from "react-i18next";

const AppNavbar = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      fixed="top"
      className="border-bottom border-primary"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          ICMarketing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              {t("navbar.home")}
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              {t("navbar.about")}
            </Nav.Link>
          </Nav>
          <Nav className="gap-3">
            <div className="d-flex gap-1">
              <Button
                variant="outline-dark"
                onClick={() => changeLanguage("en")}
              >
                EN
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => changeLanguage("gr")}
              >
                GR
              </Button>
            </div>
            {user ? (
              <>
                <Button variant="outline-primary" as={Link} to="/profile">
                  {t("navbar.profile")}
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  {t("navbar.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary" as={Link} to="/login">
                  {t("navbar.signIn")}
                </Button>
                <Button variant="primary" as={Link} to="/register">
                  {t("navbar.register")}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
