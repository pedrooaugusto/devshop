import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import compose from 'recompose/compose';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import Hidden from 'material-ui/Hidden';
import {LinearProgress} from 'material-ui/Progress';
import Dialog, {
	DialogTitle, DialogActions, 
	DialogContent} from 'material-ui/Dialog';

import * as Helpers from '../../../Helpers';

const styles = theme => ({
	devDetailsAvatar:{
		width: "90px",
		height: "90px"
	}
});

class DevCard extends React.Component{
	validInteger = (a) => {
		return (a !== "" && !isNaN(a) && !a.match(/,|\./g) && parseInt(a, 10) > 0);
	}

	updateTotalPrice = (event) => {
		const v = event.target.value;
		const ok = this.validInteger(v);
		this.props.updateTotalPrice(parseInt(v, 10));
		this.props.errorHoursField(!ok);
	}

	focusOff = (event) => {
		const v = event.target.value;
		if(!this.validInteger(v))
		{
			this.props.updateTotalPrice(0);
			this.props.errorHoursField(false);
			event.target.value = "";
		}
		else
		{
			this.props.errorHoursField(false);
			this.props.insertHours(parseInt(v, 10));
		}
	}

	add = () => {
		const value = `${this.props.devDetails.get('hoursInputValue')}`;
		if(this.validInteger(value))
			this.props.addDevToCart(this.props.devDetails.get('developer'));
		else
			this.hours.focus();
	}

	remove = () => {
		this.props.removeDevFromCart(this.props.devDetails.get('developer'), true);
	}
	
	save = () => {
		const value = `${this.props.devDetails.get('hoursInputValue')}`;
		if(this.validInteger(value))
			this.props.alterDevInCart(this.props.devDetails.get('developer'));
		else
			this.hours.focus();
	}

	render(){
		const {classes} = this.props;
		return (
			<Dialog 
				open = {this.props.devDetails.get('isOpen')}
				onRequestClose = {this.props.onClose}
				maxWidth = "md">
					{this.props.devDetails.get('loading') && <LinearProgress/>}
					<DialogTitle>
						{this.props.devDetails.get('error') ? "Error" : "Developer Details"}
					</DialogTitle>
					<DialogContent 
						className = "devDetails">
						{this.props.devDetails.get('loading') && 
						<Typography type = "subheading">Loading...</Typography>
						}
						{this.props.devDetails.get('error') && 
						<Typography type = "subheading">Well done! <b>You</b> broke it!</Typography>
						}
						{!this.props.devDetails.get('loading') &&
							!this.props.devDetails.get('error') && 
						<Grid 
							container
							direction = "column"
							spacing = {16}>
							<Grid item xs = {12}>
								<Grid 
									direction = "column"
									container justify = "center" 
									alignItems = "center">
									<Grid item xs = {12}>
										<Avatar 
											alt = "Peter" 
											src = {this.props.devDetails.getIn(['developer', 'avatar_url'])} 
											className = {classes.devDetailsAvatar}/>
									</Grid>
									<Grid item xs = {12}>
										<Typography type = "text">
											{this.props.devDetails.getIn(['developer', 'login'])}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs = {12}>
								<Grid 
									container
									direction = "row"
									justify = "center">
									<Grid item xs = {4}>
										<Typography type = "text" align = "center">
											{this.props.devDetails.getIn(['developer', 'starsCount'])}
										</Typography>
										<Typography type = "caption" align = "center">Stars</Typography>
									</Grid>
									<Grid item xs = {4}>
										<Typography type = "text" align = "center">
											{this.props.devDetails.getIn(['developer', 'reposCount'])}
										</Typography>
										<Typography type = "caption" align = "center">Repositories</Typography>
									</Grid>
									<Grid item xs = {4}>
										<Typography type = "text" align = "center">
											{this.props.devDetails.getIn(['developer', 'followersCount'])}
										</Typography>
										<Typography type = "caption" align = "center">Followers</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs = {12}>
								<Typography 
									type = "subheading">
									Price per hour <font color = {"#4caf50"}>
											{Helpers.formatMoney(this.props.devDetails.getIn(['developer', 'price']))}
										</font>
								</Typography>
								<Typography type = "caption">Followers * (Stars / Repositories) + 5</Typography>
							</Grid>
							<Grid item xs = {12}>
								<TextField
								    id = "project-dev-worked-hour"
								    label = "Hours"
								    type = "number"
								    margin = "none"
								    required
								    inputRef = {(hours) => {this.hours = hours}}
								    value = {this.props.devDetails.get('hoursInputValue') || ''}
								    error = {this.props.devDetails.get('errorHoursInput')}
								    onBlur = {
								    	this.props.devDetails.get('readOnly') ? () => {} : 
								    	this.focusOff
								    }
								    inputProps = {{
								    	readOnly: this.props.devDetails.get('readOnly'), 
								    	min: 1,
								    	max: 1200,
								    	step: 1
								    }}
								    helperText = "For how many hours you will use this dev ?"
								    onChange = {
								    	this.props.devDetails.get('readOnly') ? () => {} : 
								    	this.updateTotalPrice
								    }
								    fullWidth/>
							</Grid>
							<Grid item xs = {12}>
								<Typography 
									align = "right"
									type = "text">
									<font color = {"#4caf50"}>
										Total Price {
											Helpers.formatMoney(
												(this.props.devDetails.get('hoursInputValue') || 0) * 
												this.props.devDetails.getIn(['developer', 'price']))}
									</font>
								</Typography>
							</Grid>
						</Grid>}
					</DialogContent>
					<Divider light/>
					{!this.props.devDetails.get('loading') &&
					<DialogActions>
						{!this.props.devDetails.get('readOnly') &&
							!this.props.devDetails.get('error')&&
						<span>
							{this.props.devDetails.getIn(['developer', 'inCart']) &&
							<Button color = "primary" onClick = {this.save}>
								<Icon className = "leftIcon">save</Icon>
								<Hidden mdDown>Save</Hidden>
							</Button>}
							{!this.props.devDetails.getIn(['developer', 'inCart']) &&
							<Button color = "primary" onClick = {this.add}>
								<Icon>add_shopping_cart</Icon>
								<Hidden mdDown>Add</Hidden>
							</Button>}
							{this.props.devDetails.getIn(['developer', 'inCart']) &&
							<Button color = "primary" onClick = {this.remove}>
								<Icon className = "leftIcon">remove_shopping_cart</Icon>
								<Hidden mdDown>Remove</Hidden>
							</Button>}
						</span>}
						<Button onClick = {this.props.onClose} color = "primary">
							Close
						</Button>
					</DialogActions>}
			</Dialog>
		);
	}
}

export default compose(withStyles(styles), withWidth())(DevCard);