import { useState } from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSidebarToggle } from "../../../hooks/useSidebarToggle";
import { SidebarItem } from "../../../types/types";

export function SidebarMenuItem({ item }: { item: SidebarItem }) {
    const [openSubMenu, setopenSubMenu] = useState(false);
    const { toggleCollapse } = useSidebarToggle();

    const handleDraweropenSubMenu = () => {
        setopenSubMenu(!openSubMenu);
    };

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: toggleCollapse ? "initial" : "center",
                    px: 2.5,
                }}
                onClick={handleDraweropenSubMenu}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: toggleCollapse ? 3 : "auto",
                        justifyContent: "center",
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.title}
                    sx={{
                        opacity: toggleCollapse ? 1 : 0,
                    }}
                />
                {toggleCollapse === true && item.subMenu && (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            ml: toggleCollapse ? 3 : "auto",
                            justifyContent: "center",
                        }}
                    >
                        <ExpandMoreIcon />
                    </ListItemIcon>
                )}
            </ListItemButton>
            {openSubMenu && (
                <List
                    sx={{
                        marginLeft: 2,
                    }}
                    disablePadding
                >
                    {item.subMenu &&
                        item.subMenuItem?.map((sub: any, index: number) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    display: "block",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: toggleCollapse
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: toggleCollapse ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {sub.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={sub.title}
                                        sx={{
                                            opacity: toggleCollapse ? 1 : 0,
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            )}
        </ListItem>
    );
}
