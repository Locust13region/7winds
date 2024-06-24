import { IModifiedRow, RowAction } from "./types";

const eID = 126490;
const urlBase = `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/`;
const urlGetList = urlBase + `list`;

export const getListRequest = async () => {
	try {
		const response = await fetch(urlGetList);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.log("Fetch", error);
	}
};

export const rowRequest = async (
	rowId: number | null,
	bodyData: IModifiedRow,
	rowAction: RowAction
) => {
	const postBody =
		rowAction === "create" ? { ...bodyData, parentId: rowId } : bodyData;
	const postUrl =
		rowAction === "create"
			? urlBase + rowAction
			: urlBase + rowId + "/" + rowAction;
	try {
		const response = await fetch(postUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postBody),
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.log("Fetch", error);
	}
};

export const deleteRowRequest = async (rowId: number) => {
	try {
		const response = await fetch(urlBase + rowId + "/delete", {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const result = await response.json();
		return result;
	} catch (error) {
		console.log("Fetch", error);
	}
};
