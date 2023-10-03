import Dexie from 'dexie';
import type { ItemState } from '../model/item-state';
import type { IList } from '../model/list';

export class ProjectDb extends Dexie {
	items!: Dexie.Table<ItemState>;

	constructor() {
		super('packliste');
		this.version(3).stores({
			items: '++id, listKey, groupKey, itemKey, state, irrelevant'
		});

		this.on('populate', () => this.onPopulate());
	}

	private async onPopulate() {
		if (typeof window !== 'undefined') {
			if (await this.migrateFromLocalStorage()) {
				return;
			}
		}
	}

	private async migrateFromLocalStorage(): Promise<boolean> {
		const value = window.localStorage?.getItem('list.Packliste.v1');
		if (!value) {
			return false;
		}

		const l = JSON.parse(value) as LocalStorageValueList;

		await this.transaction('rw', this.items, () =>
			Promise.all(
				l.groups.map((g) =>
					Promise.all(
						g.items.map((i) =>
							this.items.add({
								itemKey: i.key,
								groupKey: g.key,
								listKey: l.key,
								state: i.state ?? false,
								irrelevant: i.irrelevant ?? false
							})
						)
					)
				)
			)
		);

		window.localStorage.removeItem('list.Packliste.v1');

		return true;
	}
}

export const db = new ProjectDb();
export * from './utils';

interface LocalStorageValueBase {
	key: string;
	label: string;
}
export interface LocalStorageValueList extends LocalStorageValueBase {
	groups: LocalStorageValueListGroup[];
}

export interface LocalStorageValueListGroup extends LocalStorageValueBase {
	items: LocalStorageValueListItem[];
}

export interface LocalStorageValueListItem extends LocalStorageValueBase {
	state?: boolean;
	irrelevant?: boolean;
}
