import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { Fragment, useEffect, useState } from "react";
import {
	rowRequest,
	deleteRowRequest,
	getListRequest,
} from "../service/api-requests";
import { newRow, unusedParamsNewRow } from "../service/data";
import { IRow, RowAction } from "../service/types";
import {
	addRow,
	removeNewRow,
	removeRow,
	updateRow,
} from "../service/recursion";

const Content = () => {
	const [data, setData] = useState<IRow[]>([]);
	const [readonly, setReadonly] = useState<number | null>(null);
	const [trash, setTrash] = useState<number | null>(null);
	const [currentRow, setCurrentRow] = useState<IRow>(newRow);
	const [parentId, setParentId] = useState<number | null>(null);

	useEffect(() => {
		getListRequest().then((result) => setData(result));
	}, []);

	const handleShowTrash = (rowId: number) => {
		setTrash(rowId);
	};
	const handleHideTrash = () => {
		setTrash(null);
	};
	const handleRowSelect = (rowId: number) => {
		if (rowId !== readonly) {
			setCurrentRow(newRow);
			setData(removeNewRow(data));
			setReadonly(null);
		}
	};
	const handleEditRow = (row: IRow) => {
		setCurrentRow(row);
		setData(removeNewRow(data));
		setReadonly(row.id);
	};
	const handleAddRow = (parentRowId: number) => {
		setParentId(parentRowId ? parentRowId : null);
		setData(addRow(parentRowId, data));
		setCurrentRow(newRow);
		setReadonly(0);
	};
	const handleSubmit = () => {
		const bodyData = {
			rowName: currentRow.rowName,
			salary: currentRow.salary,
			equipmentCosts: currentRow.equipmentCosts,
			estimatedProfit: currentRow.estimatedProfit,
			overheads: currentRow.overheads,
			...unusedParamsNewRow,
		};
		rowRequest(
			currentRow.id ? currentRow.id : parentId,
			bodyData,
			currentRow.id ? RowAction.update : RowAction.create
		).then((result) => {
			data.length === 0
				? setData([{ ...result.current, child: [] }])
				: setData(
						updateRow(currentRow.id, result.current, result.changed, data)
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  );
		});
		setCurrentRow(newRow);
		setReadonly(null);
	};

	const handleDeleteRow = (row: IRow) => {
		if (data.length === 0) {
			return;
		}
		setData(removeNewRow(data));
		deleteRowRequest(row.id).then((result) => {
			result.changed.length === 0
				? setData([])
				: setData(removeRow(row.id, result.changed, data));
		});
	};

	const renderRows = (data: IRow[], depth = 0): JSX.Element => {
		if (data.length === 0) {
			return <>{renderRow(newRow, depth)}</>;
		}
		return (
			<>
				{data.map((row) => {
					if (row.child.length === 0) {
						return <Fragment key={row.id}>{renderRow(row, depth)}</Fragment>;
					} else {
						return (
							<Fragment key={row.id}>
								{row && renderRow(row, depth)}
								{row && renderRows(row.child, depth + 3)}
							</Fragment>
						);
					}
				})}
			</>
		);
	};

	const renderRow = (row: IRow, depth: number) => {
		const editable = readonly === row.id ? true : false;
		const showTrash = !editable && trash === row.id ? "visible" : "hidden";
		return (
			<TableRow
				key={row.id}
				onClick={() => {
					handleRowSelect(row.id);
				}}
				onDoubleClick={() => {
					handleEditRow(row);
				}}
				sx={{
					minWidth: 110,
					"&:last-child td, &:last-child th": { border: 0 },
				}}
			>
				<TableCell sx={{ minWidth: 110 }}>
					<Box
						display={"flex"}
						flexDirection={"row"}
						gap={1}
						onMouseLeave={handleHideTrash}
						marginLeft={depth}
					>
						<IconButton
							onMouseEnter={() => handleShowTrash(row.id)}
							sx={{ padding: 0 }}
							onClick={(event) => {
								event.stopPropagation();
								readonly === null && handleAddRow(row.id);
							}}
						>
							<TextSnippetIcon />
						</IconButton>
						<IconButton
							sx={{
								padding: 0,
								visibility: showTrash,
							}}
							onClick={(event) => {
								event.stopPropagation();
								handleDeleteRow(row);
							}}
						>
							<DeleteOutlineIcon color="error" />
						</IconButton>
						{row.id}
					</Box>
				</TableCell>
				<TableCell
					align="left"
					sx={{ flexGrow: 1 }}
				>
					<TextField
						name="rowName"
						autoFocus={true}
						value={editable ? currentRow?.rowName : row.rowName}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSubmit();
								event.preventDefault();
							}
						}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value } = event.target;
							setCurrentRow((currentRow) => ({
								...currentRow,
								rowName: value,
							}));
						}}
						variant={editable ? "outlined" : "standard"}
						InputProps={
							editable
								? { readOnly: !editable }
								: {
										readOnly: !editable,
										disableUnderline: true,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
						}
					/>
				</TableCell>
				<TableCell
					align="left"
					sx={{ width: 200 }}
				>
					<TextField
						name="salary"
						value={editable ? currentRow?.salary : row.salary}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSubmit();
								event.preventDefault();
							}
						}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value } = event.target;
							setCurrentRow((currentRow) => ({
								...currentRow,
								salary: Number(value),
							}));
						}}
						variant={editable ? "outlined" : "standard"}
						InputProps={
							editable
								? { readOnly: !editable }
								: {
										readOnly: !editable,
										disableUnderline: true,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
						}
					/>
				</TableCell>
				<TableCell
					align="left"
					sx={{ width: 200 }}
				>
					<TextField
						name="equipmentCosts"
						value={editable ? currentRow?.equipmentCosts : row.equipmentCosts}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSubmit();
								event.preventDefault();
							}
						}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value } = event.target;
							setCurrentRow((currentRow) => ({
								...currentRow,
								equipmentCosts: Number(value),
							}));
						}}
						variant={editable ? "outlined" : "standard"}
						InputProps={
							editable
								? { readOnly: !editable }
								: {
										readOnly: !editable,
										disableUnderline: true,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
						}
					/>
				</TableCell>
				<TableCell
					align="left"
					sx={{ width: 200 }}
				>
					<TextField
						name="overheads"
						value={editable ? currentRow?.overheads : row.overheads}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSubmit();
								event.preventDefault();
							}
						}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value } = event.target;
							setCurrentRow((currentRow) => ({
								...currentRow,
								overheads: Number(value),
							}));
						}}
						variant={editable ? "outlined" : "standard"}
						InputProps={
							editable
								? { readOnly: !editable }
								: {
										readOnly: !editable,
										disableUnderline: true,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
						}
					/>
				</TableCell>
				<TableCell
					align="left"
					sx={{
						width: 200,
						flexShrink: 0,
					}}
				>
					<TextField
						name="estimatedProfit"
						value={editable ? currentRow?.estimatedProfit : row.estimatedProfit}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleSubmit();
								event.preventDefault();
							}
						}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value } = event.target;
							setCurrentRow((currentRow) => ({
								...currentRow,
								estimatedProfit: Number(value),
							}));
						}}
						variant={editable ? "outlined" : "standard"}
						InputProps={
							editable
								? { readOnly: !editable }
								: {
										readOnly: !editable,
										disableUnderline: true,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
						}
					/>
				</TableCell>
			</TableRow>
		);
	};

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1 }}
		>
			<Toolbar />
			<Toolbar />
			<Paper sx={{ width: "100%", mb: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 1500 }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: 110 }}>Уровень</TableCell>
								<TableCell
									align="left"
									sx={{ flexGrow: 1 }}
								>
									Наименование&nbsp;работ
								</TableCell>
								<TableCell
									align="left"
									sx={{ width: 200 }}
								>
									Основная&nbsp;з/п
								</TableCell>
								<TableCell
									align="left"
									sx={{ width: 200 }}
								>
									Оборудование
								</TableCell>
								<TableCell
									align="left"
									sx={{ width: 200 }}
								>
									Накладные&nbsp;расходы
								</TableCell>
								<TableCell
									align="left"
									sx={{ width: 200 }}
								>
									Сметная&nbsp;прибыль
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{renderRows(data)}</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
};

export default Content;
