import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Header from "./components/header";
import Box from "@mui/material/Box";
import Sidebar from "./components/sidebar";
import Content from "./components/content";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	components: {
		MuiTextField: {
			defaultProps: {
				fullWidth: true,
				variant: "standard",
			},
			styleOverrides: {},
		},
		MuiToolbar: {
			defaultProps: {
				disableGutters: true,
				variant: "dense",
			},
			styleOverrides: {
				dense: {
					height: 44,
					minHeight: 44,
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Header />
				<Sidebar />
				<Content />
			</Box>
		</ThemeProvider>
	);
}

export default App;
