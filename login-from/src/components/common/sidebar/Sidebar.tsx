import React from "react";
import { useTheme, styled, Theme, CSSObject } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider, List } from "@mui/material";
import { SIDEBAR_ITEMS } from "../../../constants/SIDEBAR";
import { SidebarMenuGroup } from "./SidebarMenuGroup";
import { useSidebarToggle } from "../../../hooks/useSidebarToggle";
import Header from "../Header";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // width: `calc(${theme.spacing(7)} + 1px)`,
    // [theme.breakpoints.up("sm")]: {
    //     width: `calc(${theme.spacing(8)} + 1px)`,
    // },

    width: `0px`,
    [theme.breakpoints.up("sm")]: {
        width: `0px`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    position: "fixed",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function Sidebar() {
    const theme = useTheme();
    const { toggleCollapse, invokeToggleCollapse } = useSidebarToggle();

    const handleDrawerOpen = () => {
        invokeToggleCollapse();
    };

    return (
        <Drawer variant="permanent" open={toggleCollapse}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerOpen}>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {SIDEBAR_ITEMS.map((item, index) => (
                    <SidebarMenuGroup menuGroup={item} key={index} />
                ))}
            </List>
        </Drawer>
    );
}
