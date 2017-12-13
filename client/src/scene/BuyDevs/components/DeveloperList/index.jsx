import React from 'react';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import {green} from 'material-ui/colors';
import * as Helpers from '../../../../Helpers';

const styles = theme => ({
	listWrapper:{
		height: "150px",
		overflowY: "auto"
	},
	totalPrice:{
		marginTop: "10px",
		marginBottom: "10px",
		color: green[500]
	}
})

const WrapperListItem = (props) => {
	const {dev} = props;
	const clickAction = props.loadDevDetails(dev.get('id'), props.devs);
	const removeDev = () => {
		if(dev.get('inCart'))
			props.removeDevFromCart(dev, false);
		else
			clickAction();
	};
	let subText = "???";
	if(dev.get('fullLoaded'))
	{
		if(dev.get('inCart'))
		{
			const totalPrice = Helpers.formatMoney(dev.get('workedHours') * dev.get('price'));
			subText = `${dev.get('workedHours')} x ${dev.get('price').toFixed(2)} = ${totalPrice}`;
		}
		else
		{
			subText = `${Helpers.formatMoney(dev.get('price'))} / hr`;
		}
	}
	return (
		<ListItem button onClick = {clickAction}>
			<Avatar alt = {dev.get('login')} src = {dev.get('avatar_url')} />
			<ListItemText 
				primary = {dev.get('login')}
				secondary = {subText}/>
			<ListItemSecondaryAction>
				<Checkbox 
					checked = {dev.get('inCart')}
					onClick = {removeDev}/>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

class DeveloperList extends React.Component{
	render(){
		const {classes} = this.props;
		return (
			<div>
				<Typography type = "header"> 
					Developers from {this.props.company.get('name')}:
				</Typography>
				<Typography type = "caption">
					Pick up some developers from {this.props.company.get('name')}
				</Typography>
				<div className = {classes.listWrapper}>
					<List>
						{this.props.company.get('devs').map((a, b, c) => (
							<WrapperListItem
								key = {b}
								dev = {a}
								devs = {c}
								loadDevDetails = {this.props.loadDevDetails}
								removeDevFromCart = {this.props.removeDevFromCart}
							/>
						))}											
				    </List>
				</div>
				<Typography 
					align = "right" 
					className = {classes.totalPrice}
					type = "text">
				   		Total Price: {Helpers.formatMoney(
				   			this.props.company.get('devs')
				   			.filter(f => f.get('inCart'))
				   			.reduce((a, b) => (a + b.get('price') * b.get('workedHours')), 0))}
				</Typography>
				<Divider light/>
			</div>
		);
	}
}

export default withStyles(styles)(DeveloperList);