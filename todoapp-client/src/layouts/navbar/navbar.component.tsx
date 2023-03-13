import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Box, AppBar, Toolbar, Typography, Container, Menu, MenuItem, IconButton } from "@mui/material";
import { useAuth } from "../../common/auth/auth.hooks";
import TodoappLogo from "../../assets/todoapp-logo.png";
import "./navbar.component.css";

export default function NavbarComponent() {
    const authCtx = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenAvatarMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAvatarMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" color="transparent">
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Box sx={{ flexGrow: 0 }}>
                        <NavLink to="/" className="navbar-navlink navbar-navlink-logo">
                            <Avatar alt="Remy Sharp" src={TodoappLogo} />
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
                    </Box>
                    {authCtx?.user && (
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton
                                id="avatar-button"
                                aria-controls={open ? "avatar-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleOpenAvatarMenu}
                            >
                                <img
                                    src={authCtx?.user.picture}
                                    referrerPolicy="no-referrer"
                                    className="avatar-image"
                                />
                            </IconButton>
                            <Menu
                                id="avatar-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseAvatarMenu}
                                MenuListProps={{
                                    "aria-labelledby": "avatar-button"
                                }}
                            >
                                <MenuItem onClick={handleCloseAvatarMenu}>
                                    <NavLink to="/login" className="navbar-navlink">
                                        Logout
                                    </NavLink>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
