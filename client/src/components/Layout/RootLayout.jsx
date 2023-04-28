import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom";
// import theme from "../shared/theme";

const baseColor = "#4665D2"
const baseFontColor = "#363853"
const color_main_blue = '#4665D2'
const color_purple = '#7B65D2'
const color_light_blue = "#6EA8FF"
const color_very_light_blue = '#E2EDFF'
const color_mid_blue = '#6382D9'
const color_green = '#65D246'
const color_red = '#D24665'
const color_gray = '#666666'
const color_light_gray = '#ccc'
const color_blue_purple = '#675FD6'


const getTheme = (theme) => ({

    background: {
        default: "#EAF0FF",
        paper: "#F5F8FF",
    },

    palette: {
        common: {
            black: baseFontColor
        },
        mode: 'light',

        primary: {
            main: baseColor,
        },
        text: {
            primary: baseFontColor,
        },
        background: {
            default: color_very_light_blue,
            paper: "#F5F8FF",
        },
        secondary: {
            main: color_gray,
        },
        error: {
            main: color_red,
        },
        info: {
            main: color_light_blue,
        },
        blueColor: {
            main: color_mid_blue,
            purple: color_blue_purple,
            light: color_light_blue,
        },
        gray: {
            main: color_gray,
            light: color_light_gray,
        },
        red: {
            main: color_red
        }


    },

    typography: {
        body2: {
            color: baseFontColor,
        },
        // subtitle1: { //for page titles
        //     fontSize: '20px',
        //     color: baseColor,
        //     padding: '10px 15px 0 3px'
        // },
        head1: {
            color: baseColor,
            fontSize: "3rem",
            fontWeight: "500"
        },
        head2: {
            color: baseColor,
            fontSize: "2.5rem",
            fontWeight: "500"
        },
        head3: {
            color: baseColor,
            fontSize: "2rem",
            fontWeight: "500"
        },
        head4: {
            color: baseColor,
            fontSize: "1.25rem",
            fontWeight: "500"
        },
        head5: {
            color: baseColor,
            fontSize: "1rem",
            fontWeight: "500"
        },head6: {
            color: baseColor,
            fontSize: "1.5rem",
            fontWeight: "500"
        },
    },


    components: {
        MuiButton: {
            //new button varient itms
            variants: [
                {
                    props: { variant: "itms" },
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
                    props: { size: "itms-large" },
                    style: {
                        padding: '8px 22px',
                        fontSize: '0.9rem'
                    },
                },
                {
                    props: { size: "itms-small" },
                    style: {
                        padding: '4px 10px',
                        fontSize: '0.7rem',
                    },
                },
                {
                    props: { type: "close" },
                    style: {
                        color: color_red,
                    },
                },
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
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#fff"
                    // backgroundColor: "#EFF4FF"
                },
                root: {
                    borderRadius: '0px 0px 0px 0px'
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
        </ThemeProvider>
    )
}