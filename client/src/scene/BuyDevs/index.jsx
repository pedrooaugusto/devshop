import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import compose from 'recompose/compose';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {green} from 'material-ui/colors';
import DevCard from '../components/DevCard';
import LoadCompanyModal from './components/LoadCompanyModal';
import {Link} from 'react-router-dom';
import DeveloperList from './components/DeveloperList';
import ConfirmationModal from './components/ConfirmationModal';

import './styles.css';

const styles = theme => ({
	BuyDevs:{
		position: "absolute",
		backgroundColor: "#efefef",
		width: "100%",
		height: "100%"
	},
	root:{
		flexGrow: 1,
    	height: "100%"
	},
	paper: {
  		padding: "20px",
  		minHeight: "400px"
  	},
  	header:{
  		fontSize: "1rem",
  		fontWeight: 400
  	},
	listWrapper:{
		height: "150px",
		overflowY: "auto"
	},
	totalPrice:{
		marginTop: "10px",
		marginBottom: "10px",
		color: green[500]
	},
	leftIcon:{
		marginRight: theme.spacing.unit
	}
});

class BuyDevs extends React.Component{
	
	loadCompany = (event) => {
		const v = this.props.state.getIn(['company', 'name']);
		if(v !== "")
			this.props.loadCompanyModal(v);
	}

	finishBuying = (buyer) => {
		const {state} = this.props;
		const developers = state.getIn(['company', 'devs']).filter(a => a.get('inCart')).toJS();
		const data = {
			projectName: this.projectName.value,
			buyer,
			discount: state.getIn(['confirmation', 'discount']),
			company: state.getIn(['company', 'name']),
			developers,
			date: new Date().toLocaleString('pt-BR')
		};
		this.props.insertSale(data);
	}

	confirm = (event) => {
		const {state} = this.props;
		const nameIsEmpty = this.projectName.value === "";
		const companyIsEmpty = state.getIn(['company', 'name']) === "";
		const cartIsEmpty = state.getIn(['company', 'devs']).filter(a => a.get('inCart')).size < 1;
		if(!nameIsEmpty && !companyIsEmpty && !cartIsEmpty){
			this.props.openConfirmationModal();
			event.preventDefault();
		}
		else if(!nameIsEmpty && !companyIsEmpty && cartIsEmpty){
			window.alert('Empty Cart!');
			event.preventDefault();
		}
	}
	
	render(){
		const {classes} = this.props;
		return(
			<div className = {classes.BuyDevs}>
				<Grid 
					container 
					className = {classes.root}
					spacing = {0}
					justify = "center"
					alignItems = "center">
					<Grid item xs = {11} lg = {4}>
						<Paper className = {classes.paper}>
							<Grid container justify = "center" spacing = {16}>
								<Grid item xs = {12}>
									<Typography type = "subheading">Create Project</Typography>
								</Grid>
								<Grid item xs = {12}>
									<Divider light/>
								</Grid>
								<Grid item xs = {12}>
      								<form autoComplete = "off">
										<Grid container justify = "start" spacing = {24}>
											<Grid item xs = {12}>
												<TextField
											        id = "project-name"
											        label = "Project name"
											        margin = "none"
											        required
											        inputRef = {(projectName) => {this.projectName = projectName}}
											        helperText = "The name of your project."
											        fullWidth/>
											</Grid>
											<Grid item xs = {12} lg = {12}>
										        <FormControl fullWidth required>
      												<InputLabel htmlFor = "company-name">
      													Company name
      												</InputLabel>
      												<Input
        												id = "company-name"
										        		defaultValue = {this.props.state.getIn(['company', 'name'])}
        												onBlur = {this.loadCompany}
        												placeholder = "VTEX, Google, Facebook..."
        												onChange = {
        													({target}) => this.props.updateCompanyName(target.value)
        												}
        												endAdornment = {
        													<InputAdornment 
        														position = "end"
        														onClick = {this.loadCompany}>
        														<IconButton>
        															<Icon>search</Icon>
        														</IconButton>
        													</InputAdornment>
        												}/>
      												<FormHelperText>
      													Github company from which the devlopers will be loaded from
      												</FormHelperText>
        										</FormControl>
											</Grid>
											<Grid item xs = {12} lg = {12}>
												<DeveloperList 
													company = {this.props.state.get('company')}
													loadDevDetails = {this.props.loadDevDetails}
													removeDevFromCart = {this.props.removeDevFromCart}/>
											</Grid>
											<Grid item xs = {12}>
												<Grid container justify = "space-between">
													<Button 
														color = "primary"
														onClick = {this.confirm}
														type = "submit"
														className = {classes.saveButton}>
														<Icon className = {classes.leftIcon}>shopping_cart</Icon>
														<Typography type = "button">
															FINISH
														</Typography>
													</Button>
													<Link to = "/" style = {{textDecoration: "none"}}>
														<Button
															color = "default"
															className = {classes.saveButton}>
															<Typography type = "button">
																Exit
															</Typography>
														</Button>
													</Link>
												</Grid>
											</Grid>
										</Grid>
									</form>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<LoadCompanyModal
						company = {this.props.state.get('company')}
						onClose = {this.props.closeCompanyModal}/>
					<DevCard 
						onClose = {this.props.closeDevDetailsModal}
						devDetails = {this.props.state.get('devDetails')}
						removeDevFromCart = {this.props.removeDevFromCart}
						addDevToCart = {this.props.addDevToCart}
						errorHoursField = {this.props.errorHoursField}
						updateTotalPrice = {this.props.updateTotalPrice}
						alterDevInCart = {this.props.alterDevInCart}
						insertHours = {this.props.insertHours}/>
					<ConfirmationModal
						isOpen = {this.props.state.getIn(['confirmation', 'isOpen'])}
						devs = {this.props.state.getIn(['company', 'devs'])}
						onClose = {this.props.closeConfirmationModal}
						finishHim = {this.props.finishHim}
						confirmation = {this.props.state.get('confirmation')}
						applyDiscount = {this.props.applyDiscount}
						finishBuying = {this.finishBuying}/>
				</Grid>
			</div>
		);
	}
}

export default compose(withStyles(styles), withWidth())(BuyDevs);