import React from 'react';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import {LinearProgress} from 'material-ui/Progress';
import Dialog, {
	DialogTitle, DialogActions, 
	DialogContent} from 'material-ui/Dialog';

class LoadCompany extends React.Component{

	render(){
		return (
			<Dialog 
				open = {this.props.company.get('isOpen')}
				onRequestClose = {this.props.onClose}>
					{!this.props.company.get('error') &&
					<LinearProgress/>}
					<DialogTitle>
						{this.props.company.get('error') ? "Error" : "Loading"}
					</DialogTitle>
					<DialogContent>
						<Grid 
							container
							direction = "column"
							justify = "center" 
							alignItems = "center"
							spacing = {0}>
							{!this.props.company.get('error') &&
							<p>Loading list of {this.props.company.get('name')} developers from Github</p>}
							{this.props.company.get('error') &&
							<p>The company {this.props.company.get('name')} do not exist in Github!</p>}
						</Grid>
					</DialogContent>
					<Divider light/>
					<DialogActions>
						<Button onClick = {this.props.onClose} color = "primary">
							Close
						</Button>
					</DialogActions>
			</Dialog>
		);
	}
}

export default LoadCompany;