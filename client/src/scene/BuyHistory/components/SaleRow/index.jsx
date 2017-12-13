import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import * as Helpers from '../../../../Helpers';

import ExpansionPanel, 
	   {ExpansionPanelSummary, 
	   ExpansionPanelDetails} from 'material-ui/ExpansionPanel';

const styles = theme => ({
  	panelSecondaryText:{
  		color: theme.palette.text.secondary,
  		marginLeft: "15px"
  	}
});

const DevListItem = (props) => {
	const {dev} = props;
	const tPrice = dev.get('workedHours') * dev.get('price');
	const s1 = `${dev.get('workedHours')} x ${dev.get('price').toFixed(2)} = ${Helpers.formatMoney(tPrice)}`;
	const s2 = `${dev.get('login')} for ${Helpers.formatMoney(dev.get('price'))}/hr`;

	return (
		<ListItem 
			button 
			onClick = {props.openDetails(dev)}>
				<Avatar alt = {dev.get('login')} src = {dev.get('avatar_url')} />
				<ListItemText
					primary = {s2}
					secondary = {s1}/>
		</ListItem>
	);
}

class SaleRow extends React.Component{
	
	render(){
		const {classes, sale} = this.props;
		const totalPrice = sale.get('developers')
			.reduce((a, b) => (a + b.get('price') * b.get('workedHours')), 0);
		const discountPrice = totalPrice * (sale.get('discount')/100);
		const realTotal = totalPrice - discountPrice;

		return(

			<Grid item xs = {12} className = {this.props.index === 0 ? "firstProject" : ""}>
				<ExpansionPanel 
					className = "expand-panel">
					<ExpansionPanelSummary 
						expandIcon = {<Icon>arrow_drop_down</Icon>}>
						<div>
							<Typography type = "subheading">{sale.get('projectName')}</Typography>
						</div>
						<div>
							<Typography 
								type = "subheading"
								className = {classes.panelSecondaryText}>
									{Helpers.formatMoney(realTotal)}
							</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing = {0}>
							<Grid item xs = {12}>
								<Typography>
									{sale.get('buyer')}, hired the following developers from {sale.get('company')} to work at project {sale.get('projectName')}:
								</Typography>
							</Grid>
							<Grid item xs = {12}>
								<List dense>
									{sale.get('developers').map((a, b) => (
										<DevListItem 
											key = {b} 
											dev = {a}
											openDetails = {this.props.openDetails}/>
									))}
								</List>
							</Grid>
							<Grid item xs = {12}>
								<Divider light/>
							</Grid>
							<Grid item xs = {12} style = {{marginTop: "15px"}}>
								<Typography>
									Date: {sale.get('date')}
								</Typography>
								<Typography>
									Partial Total: {Helpers.formatMoney(totalPrice)}
								</Typography>												
								<Typography>
									<font color = "red">Discount: {Helpers.formatMoney(discountPrice)}</font>
								</Typography>
								<Typography type = "subheading">
									<font color = "green">Total Cost: {Helpers.formatMoney(realTotal)}</font>
								</Typography>
							</Grid>
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Grid>
		);
	}
}

export default withStyles(styles)(SaleRow);