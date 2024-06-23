export interface IModifiedRow {
	equipmentCosts: number;
	estimatedProfit: number;
	machineOperatorSalary: number;
	mainCosts: number;
	materials: number;
	mimExploitation: number;
	overheads: number;
	rowName: string;
	salary: number;
	supportCosts: number;
}
export interface INewRow extends IModifiedRow {
	parentId: number | null;
}
export interface IChanged extends IModifiedRow {
	id: number;
	total: number;
}
export interface IRow extends IChanged {
	child: IRow[];
}

export enum RowAction {
	create = "create",
	update = "update",
}
