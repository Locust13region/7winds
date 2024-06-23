import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material";
import AppsTwoToneIcon from "@mui/icons-material/AppsTwoTone";
import ReplyIcon from "@mui/icons-material/Reply";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StyledListItemButton = styled(ListItemButton)(() => ({
	opacity: 0.6,
	paddingLeft: 0,
	paddingRight: 0,
	"&.Mui-selected": {
		opacity: 1,
		backgroundColor: "transparent",
		borderBottom: "3px solid #ffffff",
	},
}));

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar
				disableGutters
				variant="dense"
				sx={{
					height: "44px",
					borderBottom: `1px solid ${alpha("#ffffff", 0.2)}`,
				}}
			>
				<nav aria-label="header-menu">
					<List
						disablePadding
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: 4,
							marginLeft: 2,
						}}
					>
						<ListItem disablePadding>
							<StyledListItemButton selected={false}>
								<ListItemIcon sx={{ minWidth: "24px" }}>
									<AppsTwoToneIcon />
								</ListItemIcon>
							</StyledListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<StyledListItemButton selected={false}>
								<ListItemIcon sx={{ minWidth: "24px" }}>
									<ReplyIcon />
								</ListItemIcon>
							</StyledListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<StyledListItemButton selected={true}>
								<ListItemText primary="Просмотр" />
							</StyledListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<StyledListItemButton selected={false}>
								<ListItemText primary="Управление" />
							</StyledListItemButton>
						</ListItem>
					</List>
				</nav>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
