import { SidebarGroup } from "../types/types";
import SettingsIcon from "@mui/icons-material/Settings";
import { HEADER_ITEMS, NOTI_ITEMS, SETTING_ITEMS } from "./HEADER";

export const SIDEBAR_ITEMS: SidebarGroup[] = [
    {
        title: "Managements",
        menuList: HEADER_ITEMS,
    },
    {
        title: "Notifications",
        menuList: NOTI_ITEMS,
    },
    {
        title: "Settings",
        menuList: SETTING_ITEMS,
    },
];
