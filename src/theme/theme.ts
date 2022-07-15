import createTheme from "@mui/material/styles/createTheme";

export const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 768,
        },
    },
});

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
    }
}