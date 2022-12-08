import { ListItemButton, ListItemIcon, ListItemText, ListItem as MListItem } from "@mui/material";
import { ReactNode } from "react";

export function ListItem({ primary, secondary, icon, children }: { primary?: string, secondary?: string, icon?: ReactNode, children?: ReactNode }) {
  return (
    <MListItem disablePadding>
      <ListItemButton>
        {icon && <ListItemIcon>
          {icon}
        </ListItemIcon>
        }
        {(primary || secondary) && <ListItemText primary={primary} secondary={secondary} />}
        {children}
      </ListItemButton>
    </MListItem>
  );
}
