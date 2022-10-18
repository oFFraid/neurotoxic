import * as React from "react";
import {memo} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
    return (<Typography
        variant="body2"
        color="text.secondary"
    >
        {'Copyright © '}
        <Link
            color="inherit"
            href="https://mui.com/"
        >
            neuroToxic
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}


export default memo((props) => {
    return <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: props.backgroundColor,
        }}
    >
        <Container maxWidth="sm">
            <Typography variant="body2">
                created by ist-191
            </Typography>
            <Copyright/>
        </Container>
    </Box>;
})
