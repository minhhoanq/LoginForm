import { SidebarGroup } from "../types/types";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

export const SIDEBAR_ITEMS: SidebarGroup[] = [
    {
        title: "Home",
        menuList: [
            {
                title: "Home",
                path: "/",
                icon: <HomeIcon />,
            },
        ],
    },
    {
        title: "Management",
        menuList: [
            {
                title: "Product",
                path: "/product",
                icon: <CategoryIcon />,
                subMenu: true,
                subMenuItem: [
                    {
                        title: "Product",
                        path: "/product",
                        icon: <CategoryIcon />,
                    },
                    {
                        title: "Product",
                        path: "/product",
                        icon: <CategoryIcon />,
                    },
                ],
            },
            {
                title: "Cart",
                path: "/cart",
                icon: <ShoppingCartIcon />,
            },
            {
                title: "About",
                path: "/about",
                icon: <InfoIcon />,
            },
        ],
    },
    {
        title: "Settings",
        menuList: [
            {
                title: "Setting",
                path: "/setting",
                icon: <SettingsIcon />,
            },
        ],
    },
];
