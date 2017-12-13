import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class SalesHistoryStore extends ReduceStore{
	constructor(){
		super(AppDispatcher);
	}

	getInitialState(){
		return Immutable.fromJS({
			loading: true,
			filterText: '',
			devDetails:{
				isOpen: false,
				developer: {},
				loading: false,
				errorMessage: '',
				error: false,
				readOnly: true,
				hoursInputValue: 0
			},
			sales: [],
			error: false
		});
	}
	
	reduce(state, action){
		let nData = null;
		switch(action.type)
		{
			case AppActionTypes.SALES_HISTORY_SALES_LIST:
				nData = Immutable.fromJS(action.data);
				return Object
					.keys(action.data)
						.reduce((a, b) => (a
							.updateIn([...b.split('.')], f => nData.get(b))), state);
					
			default:
				return state;
		}
	}
}

export default new SalesHistoryStore();