import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom";
// import theme from "../shared/theme";

const baseColor = "#4665D2"
const baseFontColor = "#363853"

const getTheme = (theme) => ({

    background: {
        default: "#F5F8FF",
        paper: "#F5F8FF",
    },

    palette: {
        common: {
            black: baseFontColor
        },

        primary: {
            main: baseColor,
        },
        text: {
            primary: baseFontColor,
        }

    },

    typography: {
        body2: {
            color: baseFontColor,
        }
    },
    
    components: {
        MuiButton: {
            //new button varient itms
            variants: [
                {
                    props: {variant: "itms"},
                    style: {
                        background: baseColor,
                        color: '#F5F8FF',
                        '&:hover': {
                            background: baseFontColor,
                            
                        },
                        borderRadius: '10px',
                        margin: '2px',
                        padding: '6px 14px',
                    },
                },
                {
                    props: {size: "itms-large"},
                    style: {
                        padding: '8px 22px',
                        fontSize: '0.9rem'
                    },
                },
                {
                    props: {size: "itms-small"},
                    style: {
                        padding: '4px 10px',
                        fontSize: '0.7rem',
                    },
                }
            ],

            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    // borderRadius: '20px'
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: baseColor,
                    borderTopRightRadius: '15px',
                    borderBottomRightRadius: '10px',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#EFF4FF"
                },
                root: {
                    borderRadius: '0px 0px 0px 10px'
                }
                
            }
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: "#EAFOFF"
            }
        },
    },
});

export const RootLayout = () => {
    const defaultTheme = createTheme();
    let theme = createTheme(getTheme(defaultTheme))

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Outlet/>
        </ThemeProvider>
    )
}