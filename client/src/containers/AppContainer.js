import App from '../App.jsx';
import {Container} from 'flux/utils';
import BuyDevStore from '../data/BuyDevStore';
import * as BuyDevActions from '../data/BuyDevActions';
import * as SalesHistoryActions from '../data/SalesHistoryActions';
import SalesHistoryStore from '../data/SalesHistoryStore';

function getStores () 
{
	return [
		BuyDevStore,
		SalesHistoryStore
	];
}
function getState () 
{
	return {
		buyDevs: {
			state: BuyDevStore.getState(),
			...BuyDevActions
		},
		salesHistory:{
			state: SalesHistoryStore.getState(),
			...SalesHistoryActions
		}
	};
}
export default Container.createFunctional(App, getStores, getState);