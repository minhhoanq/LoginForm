import React from "react";
import { List, ListItem, Typography, colors } from "@mui/material";
import { SidebarGroup } from "../../../types/types";
import { useSidebarToggle } from "../../../hooks/useSidebarToggle";
import { SidebarMenuItem } from "./SidebarMenuItem";

export function SidebarMenuGroup({ menuGroup }: { menuGroup: SidebarGroup }) {
    const { toggleCollapse } = useSidebarToggle();

    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            {toggleCollapse ? (
                <Typography
                    sx={{
                        marginLeft: 2,
                        color: colors.grey[500],
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                    }}
                >
                    {menuGroup.title}
                </Typography>
            ) : (
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    ...
                </Typography>
            )}

            <List>
                {menuGroup.menuList.map((menu, index) => (
                    <SidebarMenuItem item={menu} key={index} />
                ))}
            </List>
        </ListItem>
    );
}
