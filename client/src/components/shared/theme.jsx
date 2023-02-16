import { createTheme } from "@mui/material"

const baseColor = "#4665D2"
const baseFontColor = "#363853"

const theme = createTheme ({

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

    },
    shape: {
        borderRadius: 100,
    },

    typography:{
        body2: {
            color: baseFontColor
        },
        body1: {
            color: '#EFF4FF'
        }
    },
    
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: baseColor,
                },
            },
            defaltProps: {
                disableRipple: true
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: '20px'
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
                colorPrimary: '#EAFOFF'
            }
        }
    },
});

export default theme;