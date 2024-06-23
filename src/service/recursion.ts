import { newRow } from "./data";
import { IChanged, IRow } from "./types";

export function addRow(parentId: number | null, array: IRow[]): IRow[] {
	const newArray = structuredClone(array);
	const addRowRecursive = (parentId: number | null, rows: IRow[]): boolean => {
		for (const row of rows) {
			if (row.id === parentId) {
				row.child.push(newRow);
				return true;
			}
			if (row.child.length > 0) {
				const added = addRowRecursive(parentId, row.child);
				if (added) {
					return true;
				}
			}
		}
		return false;
	};
	addRowRecursive(parentId, newArray);
	return newArray;
}
export function removeNewRow(array: IRow[]): IRow[] {
	const newArray = structuredClone(array);
	const removeNewRowRecursive = (rows: IRow[]) => {
		rows.forEach((row) => {
			if (row.child.length === 0) {
				return;
			}
			if (
				row.child.some((row) => {
					return row.id === 0;
				})
			) {
				row.child.pop();
				return;
			}
			removeNewRowRecursive(row.child);
		});
	};
	removeNewRowRecursive(newArray);
	return newArray;
}
export function updateRow(
	targetRowId: number,
	current: IChanged,
	changed: IChanged[],
	array: IRow[]
) {
	const newArray = structuredClone(array);

	const updateRowRecursive = (
		targetRowId: number,
		current: IChanged,
		changed: IChanged[],
		rows: IRow[]
	) => {
		let found = false;
		rows.forEach((row) => {
			if (row.id === targetRowId) {
				Object.assign(row, { ...current });
				found = true;
				return;
			}
			if (row.child.length === 0) {
				return;
			}
			const result = updateRowRecursive(
				targetRowId,
				current,
				changed,
				row.child
			);
			if (result) {
				found = true;
			}
			reverseAction(changed, row);
		});
		return found;
	};
	updateRowRecursive(targetRowId, current, changed, newArray);
	return newArray;
}

export function removeRow(
	currentRowId: number,
	changed: IChanged[],
	array: IRow[]
) {
	const newArray = structuredClone(array);

	const removeRowRecursive = (
		currentRowId: number,
		changed: IChanged[],
		rows: IRow[]
	) => {
		let found = false;
		rows.forEach((row) => {
			const deletedChildIndex = row.child.findIndex(
				(child) => child.id === currentRowId
			);
			if (deletedChildIndex !== -1) {
				row.child.splice(deletedChildIndex, 1);
				Object.assign(row, { ...changed[0] });
				found = true;
				return;
			}
			if (row.child.length === 0) {
				return;
			}
			const result = removeRowRecursive(currentRowId, changed, row.child);
			if (result) {
				found = true;
			}
			reverseAction(changed, row);
		});
		return found;
	};
	removeRowRecursive(currentRowId, changed, newArray);
	return newArray;
}

function reverseAction(changed: IChanged[], row: IRow) {
	changed.length &&
		changed.forEach((changedRow) => {
			if (changedRow.id === row.id) {
				Object.assign(row, { ...changedRow });
			}
		});
}
