interface IBase {
	key: string;
	label: string;
}
export interface IList extends IBase {
	groups: IListGroup[];
}

export interface IListGroup extends IBase {
	items: IListItem[];
}

export type IListItem = IBase;
