import { Avatar, Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import TodoappLogo from "../../assets/todoapp-logo.png";
import GoogleLoginComponent from "./google-login/google-login.component";

export default function LoginPage() {
    return (
        <Card
            sx={{
                width: 350,
                padding: "1.5rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}
        >
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Sign in to
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Avatar alt="Remy Sharp" src={TodoappLogo} />
                    <Typography variant="h4">TodoApp</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <GoogleLoginComponent />
            </CardActions>
        </Card>
    );
}