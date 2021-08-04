import important from './important.yaml'
import forTheRide from './for-the-ride.yaml'
import clothes from './clothes.yaml'
import type {IList} from '../../../model/list';

export const defaultList: IList = {
  label: 'default',
  key: 'Packliste',
  groups: [
    important,
    forTheRide,
    clothes,
  ]
}
