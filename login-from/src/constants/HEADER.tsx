import { HeaderItem } from "../types/types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export const HEADER_ITEMS: HeaderItem[] = [
    {
        title: "Home",
        path: "/",
        icon: <HomeOutlinedIcon />,
        iconActive: <HomeIcon />,
    },
    {
        title: "Product",
        path: "/product",
        icon: <CategoryOutlinedIcon />,
        iconActive: <CategoryIcon />,
    },
    {
        title: "Pricing",
        path: "/pricing",
        icon: <ShoppingCartOutlinedIcon />,
        iconActive: <ShoppingCartIcon />,
    },
    {
        title: "Blog",
        path: "/blog",
        icon: <InfoOutlinedIcon />,
        iconActive: <InfoIcon />,
    },
];

export const NOTI_ITEMS: HeaderItem[] = [
    {
        title: "Notification",
        path: "/notification",
        icon: <NotificationsNoneOutlinedIcon />,
        iconActive: <NotificationsIcon />,
    },
    {
        title: "Cart",
        path: "/cart",
        icon: <ShoppingCartOutlinedIcon />,
        iconActive: <ShoppingCartIcon />,
    },
];

export const SETTING_ITEMS: HeaderItem[] = [
    {
        title: "Profile",
        path: "/profile",
        icon: <AccountCircleOutlinedIcon />,
        iconActive: <AccountCircleIcon />,
    },
    {
        title: "Settings",
        path: "/setting",
        icon: <SettingsOutlinedIcon />,
        iconActive: <SettingsIcon />,
    },
    {
        title: "Sign out",
        path: "/sign-out",
        icon: <LogoutOutlinedIcon />,
        iconActive: <LogoutOutlinedIcon />,
    },
];
