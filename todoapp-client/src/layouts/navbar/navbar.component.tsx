import { NavLink } from "react-router-dom";
import { Avatar, Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import TodoappLogo from "../../assets/todoapp-logo.png";
import "./navbar.component.css";

export default function Navbar() {
    return (
        <AppBar position="fixed" color="transparent">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar alt="Remy Sharp" src={TodoappLogo} />
                    </Box>
                    <NavLink to="/" className="navbar-navlink">
                        <Typography
                            variant="h6"
                            noWrap
                            component="span"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            TodoApp
                        </Typography>
                    </NavLink>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
