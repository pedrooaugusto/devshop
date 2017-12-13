import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import * as GithubApi from '../Api/GithubApi';


/*
	Carrega as vendas do bd
*/
export async function loadSales() {
	try
	{
		salesList({loading: true});
		const res = (await GithubApi.listSales());
		if(!res.ok)
			throw Error(res.statusCode);
		const sales = await res.json();
		salesList({
			loading: false,
			sales,
			error: false,
			filterText: ''
		});
	}catch(err){
		salesList({
			loading: false,
			error: true
		});
	}
}


export function openDetails(dev) {
	return function () {
		salesList({
			'devDetails.isOpen': true,
			'devDetails.developer': dev,
			'devDetails.hoursInputValue': dev.get('workedHours')
		});
	}
}


export function closeDetails() {
	salesList({
		'devDetails.isOpen': false,
		'devDetails.developer': {}
	});
}


/* Atualiza o filtro de pesquisa */
export function updateFilter(filterText) {
	salesList({filterText});
}


/* Altera o state de sales */
function salesList(props) {
	AppDispatcher.dispatch({
		type: AppActionTypes.SALES_HISTORY_SALES_LIST,
		data: props
	});
}