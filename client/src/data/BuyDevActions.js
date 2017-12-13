import AppActionTypes from './AppActionTypes';
import AppDispatcher from './AppDispatcher';
import * as GithubApi from '../Api/GithubApi';


/* 
	Carrega a lista de membros de uma
	organização qualquer do github
*/
export async function loadCompanyModal (name) {
	try
	{
		openCompanyModal(name);
		const res = await GithubApi.developersFromOrg(name);
		if(!res.ok)
			throw Error(res.statusCode);
		const devs = (await res.json()).map((a, b) => {
			a.fullLoaded = false;
			a.inCart = false;
			a.workedHours = 0;
			a.price = 0;
			a.starsCount = 0;
			a.followersCount = 0;
			a.reposCount = 0;
			return a;
		});
		companyModal({devs, isOpen: false});
	}catch(err){
		companyModal({
			devs: [],
			error: true,
			loading: false
		});	
	}
}

/*
	Carrega o restantes dos dados de um
	desenvolvedor qualquer do github.
	Carrega todos os seguidores de um dev
	e a lista de seus repositórios, depois
	é usado um .reduce() para calcular
	o total de estrelas de todos os repos
*/
export function loadDevDetails(devId, devList) {
	return async function () {
		try
		{
			const data = {
				isOpen: true, 
				loading: true, 
				error: false,
				developer: undefined,
				hoursInputValue: 0
			};
			let dev = devList.find(a => parseInt(a.get('id'), 10) === parseInt(devId, 10));
			if(!dev.get('fullLoaded'))
			{
				data.loading = true;
				devDetails(data);

				const res_repos = await GithubApi.listRepositoriesFromUser(dev.get('login'));
				if(!res_repos.ok)
					throw Error(res_repos.statusCode);
								
				const res_followers = await GithubApi.listFollowersFromUser(dev.get('login'));
				if(!res_followers.ok)
					throw Error(res_followers.statusCode);

				const repos = await res_repos.json();
				const followers = await res_followers.json();

				const reposCount = repos.length;
				const followersCount = followers.length;
				const starsCount = repos.reduce((a, b) => a + b.stargazers_count, 0);
				const price = reposCount > 0 ? (followersCount * (starsCount / reposCount) + 5) : 5;

				dev = dev
						.set('reposCount', reposCount)
						.set('starsCount', starsCount)
						.set('followersCount', followersCount)
						.set('price', price)
						.set('fullLoaded', true);

				data.developer = dev;
				data.loading = false;

				devDetails(data);

				updateDev(dev);
			}
			else
			{
				data.developer = dev;
				data.loading = false;
				data.hoursInputValue = dev.get('workedHours');

				devDetails(data);				
			}
		}catch(err){
			devDetails({
				error: true,
				loading: false
			});
		}
	}
}


/*
	Persiste uma venda no banco de dados
*/
export async function insertSale(sale) {
	try
	{
		confirmation({loading: true});
		const res = await GithubApi.newSale(sale);
		if(!res.ok)
			throw Error(res.statusCode);
		confirmation({
			error: false,
			finish: true,
			loading: false
		});
	}catch(err){
		confirmation({
			error: true,
			finish: true,
			loading: false
		});
	}
}


/* 
	Altera as props de <LoadCompanyModal />
*/
function companyModal(props) {
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_LOAD_COMPANY_MODAL,
		data: props
	});
}


/*
	Atualiza um desenvolvedor dentro
	da lista de mebros da Companhia
*/
function updateDev(dev) {
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_DEV_DETAILS_MODAL_UPDATE_DEV,
		data: dev
	});
}


/*
	Altera as props de <DevCard />
*/
function devDetails(props) {
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_DEV_DETAILS_MODAL,
		data: props
	});
}


/*
	Altera as props de <ConfirmationModal />
*/
function confirmation(props){
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_DEV_DETAILS_CONFIRMATION,
		data: props
	});	
}


/*
	Atualiza o nome da comapanhia de
	acordo com o que é escrito no input
*/
export function updateCompanyName(name) {
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_LOAD_COMPANY_MODAL,
		data: {name, devs: []}
	});
}


export function openCompanyModal (name) {
	companyModal({
		isOpen: true,
		name,
		loading: true,
		error: false
	});
}


export function closeCompanyModal () {
	companyModal({isOpen: false});
}


/* Erro ao carregar companhia do git */
export function errorCompanyModal() {
	companyModal({
		error: true, 
		loading: false
	});
}


export function closeDevDetailsModal () {
	devDetails({
		isOpen: false, 
		errorHoursInput: false
	});
}


/* 
	Atualiza o preço total de acordo
	com a quantidade de horas trabalhada
	pelor desenvolvedor
*/
export function updateTotalPrice (hours) {
	devDetails({
		hoursInputValue: hours
	});
}


export function insertHours(hours) {
	devDetails({
		'developer.workedHours': hours		
	});
}


/* input de horas inválido */
export function errorHoursField (a) {
	devDetails({errorHoursInput: a});
}


/* Adiciona o dev no carrinho */
export function addDevToCart(dev) {
	updateDev(dev.set('inCart', true));
	closeDevDetailsModal();
}


/* Remove o dev do carrinho */
export function removeDevFromCart(dev, closeDevDetails) {
	updateDev(dev.set('inCart', false).set('workedHours', 0));
	if(closeDevDetails)
		closeDevDetailsModal();
}


/* Altera a quantidade de horas trab pelo desenvolvedor */
export function alterDevInCart(dev) {
	updateDev(dev);
	closeDevDetailsModal();
}


export function openConfirmationModal() {
	confirmation({isOpen: true});
}


export function closeConfirmationModal() {
	confirmation({isOpen: false, discount: 0, loading: false});
}


/* aplica desconto no preço total */
export function applyDiscount(discount) {
	confirmation({discount});
}


/* reseta estate */
export function finishHim() {
	AppDispatcher.dispatch({
		type: AppActionTypes.BUYDEV_CLEAN_STATE
	});
}