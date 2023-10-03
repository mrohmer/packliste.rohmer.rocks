interface BaseContentList {
	key: string;
	label: string;
}
export interface ContentList extends BaseContentList {
	groups: ContentListGroup[];
}

export interface ContentListGroup extends BaseContentList {
	items: ContentListItem[];
}

export type ContentListItem = BaseContentList;
