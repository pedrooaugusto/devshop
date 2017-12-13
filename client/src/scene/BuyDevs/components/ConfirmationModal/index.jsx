import React from 'react';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {LinearProgress} from 'material-ui/Progress';
import {Link} from 'react-router-dom';
import Dialog, {
	DialogTitle, DialogActions, 
	DialogContent} from 'material-ui/Dialog';
import * as Helpers from '../../../../Helpers';

class ConfirmationModal extends React.Component{
	focusOff = () => {
		let v = 0;
		if(this.code.value === "#killua")
			v = 11.34
		this.props.applyDiscount(v);
	}
	finish = (event) => {
		if(this.props.confirmation.get('loading'))
			return event.preventDefault();
		if(this.buyer.value !== ""){
			event.preventDefault();
			this.props.finishBuying(this.buyer.value);
		}
	}
	render(){
		const totalPrice = this.props.devs
			.filter(f => f.get('inCart'))
			.reduce((a, b) => (a + b.get('price') * b.get('workedHours')), 0);
		const discount = this.props.confirmation.get('discount');
		const loading = this.props.confirmation.get('loading');
		return (
			<Dialog 
				open = {this.props.isOpen}
				onRequestClose = {this.props.onClose}
				ignoreBackdropClick
				maxWidth = "md">
				{loading && <LinearProgress/>}
				<form autoComplete = "off"> 
				<DialogTitle>
					{!this.props.confirmation.get('finish') ? "Confirmation" :
					this.props.confirmation.get('error') ? "Error" : "Success"}
				</DialogTitle>
				<DialogContent 
					className = "confirm">
					{!this.props.confirmation.get('finish') &&
					<Grid 
						container
						direction = "column"
						spacing = {16}>
						<Grid item xs = {12}>
							<TextField
								id = "project-owner"
								inputProps = {{size: 40}}
								label = "Your name"
								margin = "none"
								required
								inputRef = {(buyer) => {this.buyer = buyer}}
								helperText = "Who wants to buy this developers ?"
								fullWidth/>
						</Grid>
						<Grid item xs = {12}>
							<TextField
								id = "discount-code"
								inputProps = {{size: 40}}
								label = "Discount code"
								margin = "none"
								inputRef = {(code) => {this.code = code}}
								onBlur = {this.focusOff}
								helperText = "Do you have any discount code ? (#killua)"
								fullWidth/>
						</Grid>
						<Grid item xs = {12}>
							<Typography type = "subheading" align = "right">
								{Helpers.formatMoney(totalPrice)}
								<font color = "red"> - {discount}%</font>
								<font color = "green"> = {Helpers.formatMoney(totalPrice * (1 - discount/100))}
								</font>
							</Typography>
						</Grid>
					</Grid>}
					{this.props.confirmation.get('finish') &&
					<Grid 
						container
						direction = "column"
						spacing = {16}>
						<Grid item xs = {12}>
							<Typography type = "subheading">
								{this.props.confirmation.get('error') &&
								<span>Something went terribly wrong!</span>}
								{!this.props.confirmation.get('error') &&
								<span>Cheers! Your developers will arrive on next tuesday</span>}
							</Typography>
						</Grid>
					</Grid>}
				</DialogContent>
				<Divider light/>
				<DialogActions>
					{!this.props.confirmation.get('finish') && 
					<span>
					<Button 
						onClick = {this.finish}
						type = "submit"
						disabled = {loading}
						color = "accent">
						Confirm
					</Button>
					<Button onClick = {this.props.onClose} color = "primary">
						Close
					</Button>
					</span>}
					{this.props.confirmation.get('finish') &&
					<Link to = "/" style = {{textDecoration: "none"}}>
						<Button	color = "default" onClick = {this.props.finishHim}>
							OK
						</Button>
					</Link>}
				</DialogActions>
				</form>
			</Dialog>
		);
	}
}

export default ConfirmationModal;