import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProjectTitle = () => {
	return (
		<Toolbar
			sx={{
				borderBottom: 1,
				borderColor: "divider",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "234px",
					borderRight: 1,
					borderColor: "divider",
					color: alpha("#ffffff", 0.5),
				}}
			>
				<Stack
					sx={{
						ml: 2,
					}}
				>
					<Typography variant="body2">Название проекта</Typography>
					<Typography sx={{ fontSize: "10px" }}>Аббревиатура</Typography>
				</Stack>
				<IconButton>
					<KeyboardArrowDownIcon />
				</IconButton>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					maxWidth: "350px",
					padding: 2,
					height: "100%",
					borderRight: 1,
					borderColor: "divider",
				}}
			>
				<Typography sx={{ fontSize: "18px" }}>
					Строительно-монтажные работы
				</Typography>
			</Box>
		</Toolbar>
	);
};

export default ProjectTitle;
