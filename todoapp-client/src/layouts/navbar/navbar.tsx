import { NavLink } from "react-router-dom";
import TodoappLogo from "../../assets/todoapp-logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Box } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="fixed" color="transparent">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar alt="Remy Sharp" src={TodoappLogo} />
                    </Box>
                    <NavLink to="/" style={{ textDecoration: "none", color: "#000" }}>
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
