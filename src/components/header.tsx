import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material";
import AppsTwoToneIcon from "@mui/icons-material/AppsTwoTone";
import ReplyIcon from "@mui/icons-material/Reply";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import ProjectTitle from "./title";

const StyledIconButton = styled(IconButton)(() => ({
	marginLeft: "10px",
	opacity: 0.6,
}));

const StyledTab = styled(Tab)(() => ({
	padding: 0,
	marginLeft: "20px",
	fontSize: "16px",
	textTransform: "none",
	"&.Mui-selected": {
		color: "#ffffff",
	},
}));

const Header = () => {
	const [tabNumber, setTabNumber] = useState(0);

	const handleChange = (_: React.SyntheticEvent, newTabNumber: number) => {
		setTabNumber(newTabNumber);
	};
	return (
		<AppBar
			position="fixed"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar
				sx={{
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<StyledIconButton>
					<AppsTwoToneIcon />
				</StyledIconButton>
				<StyledIconButton>
					<ReplyIcon />
				</StyledIconButton>
				<Box>
					<Tabs
						value={tabNumber}
						onChange={handleChange}
						aria-label="toolbar tabs"
						TabIndicatorProps={{
							style: {
								backgroundColor: "#ffffff",
								height: 3,
								gap: "50px",
							},
						}}
					>
						<StyledTab label="Просмотр" />
						<StyledTab label="Управление" />
					</Tabs>
				</Box>
			</Toolbar>
			<ProjectTitle />
		</AppBar>
	);
};

export default Header;
