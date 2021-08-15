import important from './important.yaml';
import forTheRide from './for-the-ride.yaml';
import clothes from './clothes.yaml';
import mobileHome from './mobile-home.yaml';
import spongeBag from './sponge-bag.yaml';
import food from './food.yaml';
import boat from './boat.yaml';
import toolBox from './tool-box.yaml';
import diverse from './diverse.yaml';
import carBeforeDeparture from './car-before-departure.yaml';
import trailerBeforeDeparture from './trailer-before-departure.yaml';
import boatBeforeDeparture from './boat-before-departure.yaml';
import diverseBeforeDeparture from './diverse-before-departure.yaml';
import type {IList} from '../../../model/list';

const version = 1;

export const defaultList: IList = {
  label: 'default',
  key: `Packliste.v${version}`,
  groups: [
    important,
    forTheRide,
    clothes,
    mobileHome,
    spongeBag,
    food,
    boat,
    toolBox,
    diverse,
    carBeforeDeparture,
    trailerBeforeDeparture,
    boatBeforeDeparture,
    diverseBeforeDeparture,
  ]
}
