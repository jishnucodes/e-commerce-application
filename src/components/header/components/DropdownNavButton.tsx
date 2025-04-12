import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material";

type Item = {
  id: number;
  icon?: React.ReactNode | { id: number; label: string; icon: React.JSX.Element }[] | undefined;
  label: string;
};

type DropdownNavButtonProps = {
  item?: Item;
};
export default function DropdownNavButton(props: DropdownNavButtonProps) {
  const { item } = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!item) {
    console.error("DropdownNavButton received an undefined item");
    return null; // Prevents rendering if item is undefined
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={Array.isArray(item?.icon) ? item?.icon[0].icon : item?.icon}
        onClick={handleClick}
        sx={{ ...theme.navFontStyles }}
      >
        {item?.label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} sx={{ ...theme.navFontStyles}}>Profile</MenuItem>
        <MenuItem onClick={handleClose} sx={{ ...theme.navFontStyles}}>My account</MenuItem>
        <MenuItem onClick={handleClose} sx={{ ...theme.navFontStyles}}>Logout</MenuItem>
      </Menu>
    </>
  );
}
