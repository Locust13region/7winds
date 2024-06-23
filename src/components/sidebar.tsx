import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { styled } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { sidebarItems } from "./sidebar-items";

const drawerWidth = 234;

const ListItemButton = styled(MuiListItemButton)(() => ({
	padding: "2px 16px",
	"&.Mui-selected": {
		backgroundColor: "#A1A1AA",
	},
}));

const Sidebar = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
			}}
		>
			<Toolbar />
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					{sidebarItems.map((text) => (
						<ListItem
							key={text}
							disablePadding
						>
							<ListItemButton selected={text === "СМР" ? true : false}>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText
									primary={text}
									primaryTypographyProps={{
										style: {
											fontSize: "14px",
										},
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
