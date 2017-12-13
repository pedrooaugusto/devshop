import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';

class BuyDevStore extends ReduceStore
{
	constructor(){
		super(AppDispatcher);
	}
	getInitialState(){
		return Immutable.fromJS({
			devDetails:{
				isOpen: false,
				developer: {},
				loading: true,
				errorMessage: '',
				error: false,
				readOnly: false,
				isNew: false,
				errorHoursInput: false,
				hoursInputValue: 0
			},
			company:{
				isOpen: false,
				loading: true,
				errorMessage: '',
				error: false,
				name: '',
				devs: []
			},
			confirmation: {
				isOpen: false,
				name: '',
				discount: 0,
				loading: false,
				finish: false,
				error: false,
				message: ''
			}
		});
	}
	reduce(state, action){
		let nData = null;
		switch(action.type)
		{
			case AppActionTypes.BUYDEV_CLEAN_STATE:
				return this.getInitialState();
				
			case AppActionTypes.BUYDEV_LOAD_COMPANY_MODAL:
				nData = Immutable.fromJS(action.data);
				return Object
					.keys(action.data)
						.reduce((a, b) => (a.updateIn(['company', b], f => nData.get(b))), state);

			case AppActionTypes.BUYDEV_DEV_DETAILS_MODAL:
				nData = Immutable.fromJS(action.data);
				return Object
					.keys(action.data)
						.reduce((a, b) => (a
							.updateIn(['devDetails', ...b.split('.')], f => nData.get(b))), state);

			case AppActionTypes.BUYDEV_DEV_DETAILS_MODAL_UPDATE_DEV:
				nData = Immutable.fromJS(action.data);
				const devIndex = state
					.getIn(['company', 'devs']).findIndex(a => a.get('id') === nData.get('id'));
				return state
					.updateIn(['company', 'devs'], a => a.update(devIndex, b => nData));

			case AppActionTypes.BUYDEV_DEV_DETAILS_CONFIRMATION:
				nData = Immutable.fromJS(action.data);
				return Object
					.keys(action.data)
						.reduce((a, b) => (a.updateIn(['confirmation', b], f => nData.get(b))), state);

			default:
				return state;
		}
	}
}

export default new BuyDevStore();