import { IRow } from "./types";

export const newRow: IRow = {
	id: 0,
	rowName: "",
	total: 0,
	salary: 1,
	mimExploitation: 0,
	machineOperatorSalary: 0,
	materials: 0,
	mainCosts: 0,
	supportCosts: 0,
	equipmentCosts: 0,
	overheads: 0,
	estimatedProfit: 0,
	child: [],
};

export const unusedParamsNewRow = {
	machineOperatorSalary: 0,
	mainCosts: 0,
	materials: 0,
	mimExploitation: 0,
	supportCosts: 0,
};
