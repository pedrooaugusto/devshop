/*
	API do github só permite 60 requests por hora
	pra quem não estiver autenticado
*/

export function developersFromOrg(companyName) {
	return fetch(`https://api.github.com/orgs/${companyName}/members`);
}

export function listRepositoriesFromUser(userLogin) {
	return fetch(`https://api.github.com/users/${userLogin}/repos`);
}

export function listFollowersFromUser(userLogin) {
	return fetch(`https://api.github.com/users/${userLogin}/followers`);
}

export function newSale(sale) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return fetch('/api/insert', {
		method: 'post',
		headers,
		mode: 'cors',
		body: JSON.stringify(sale)
	});
}

export function listSales() {
	return fetch('/api/sales/list');
}