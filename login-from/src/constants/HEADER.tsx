import { HeaderItem } from "../types/types";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export const HEADER_ITEMS: HeaderItem[] = [
    {
        title: "Product",
        path: "/product",
        icon: <CategoryIcon />,
    },
    {
        title: "Pricing",
        path: "/pricing",
        icon: <ShoppingCartIcon />,
    },
    {
        title: "Blog",
        path: "/blog",
        icon: <InfoIcon />,
    },
];

export const NOTI_ITEMS: HeaderItem[] = [
    {
        title: "Notification",
        path: "/product",
        icon: <NotificationsIcon />,
    },
    {
        title: "Cart",
        path: "/pricing",
        icon: <ShoppingCartIcon />,
    },
];

export const SETTING_ITEMS: HeaderItem[] = [
    {
        title: "Profile",
        path: "/product",
        icon: <AccountCircleIcon />,
    },
    {
        title: "Settings",
        path: "/pricing",
        icon: <SettingsIcon />,
    },
    {
        title: "Sign out",
        path: "/blog",
        icon: <LogoutIcon />,
    },
];
