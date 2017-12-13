import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import compose from 'recompose/compose';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import withWidth from 'material-ui/utils/withWidth';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import {CircularProgress} from 'material-ui/Progress';
import {Link} from 'react-router-dom';

import SaleRow from './components/SaleRow';
import DevCard from '../components/DevCard';

import './styles.css';

const styles = theme => ({
	BuyHistory:{
		position: "absolute",
		backgroundColor: "#efefef",
		width: "100%",
		height: "auto",
		minHeight: "100%"
		
	},
	root: {
    	flexGrow: 1,
    	height: "auto",
    	minHeight: "100%"	
  	},
  	inputInkbar:{
  		'&:after':{
  			backgroundColor: "white",
  			color: "white"
  		}
  	},
  	underline:{
  		'&:before':{
  			backgroundColor: "white",
  			color: "white"
  		},
  		'&:hover':{
  			'&:before':{
  				backgroundColor: "white !important",
  				color: "white"
  			}
  		}
  	},
  	rootTextField:{
  		color: "white"
  	}
});

class BuyHistory extends React.Component {
	componentDidMount(){
		this.props.loadSales();
	}

	updateFilter = (event) =>{
		const text = event.target.value;
		this.props.updateFilter(text);
	}

	compareNames = (a) => {
		const b = this.props.state.get('filterText');
		return a.toLowerCase().startsWith(b.toLowerCase());
	}
	
	render(){
		const {classes} = this.props;
		return(
			<div className = {classes.BuyHistory}>
				<Grid 
					container
					direction = "column"
					className = {classes.root}
					spacing = {0}
					alignItems = "center"
					justify = "center">
					<Grid item xs = {11} lg = {12}>
						<Grid container direction = "column" spacing = {16} className = "project-list">
							<Grid item xs = {12}>
								<AppBar>
									<Toolbar>
										<Link to = "/" style = {{textDecoration: "none"}}>
											<IconButton>
												<Icon className = "toolbar-back-btn">arrow_back</Icon>
											</IconButton>
										</Link>
										<Hidden mdDown>
											<Typography type = "title" className = "toolbar-label">
												<font color = "white">Sales History</font>
											</Typography>
										</Hidden>
									<TextField 
										className = "toolbar-text-field"
										type = "text"
										placeholder = "Search"
										onChange = {this.updateFilter}
										inputRef = {(filter) => {this.filter = filter}}
										InputProps = {{classes: {
											inkbar: classes.inputInkbar, 
											underline: classes.underline,
											root: classes.rootTextField
										}, endAdornment: <InputAdornment position = "end"><Icon>search</Icon></InputAdornment>}}/>
									</Toolbar>
								</AppBar>
							</Grid>
							{this.props.state.get('loading') &&
							<Grid item xs = {12} style = {{marginTop: "200px"}}>
								<CircularProgress 
									size = {100}
									thickness = {2}/>
							</Grid>}
							{!this.props.state.get('loading') &&
							!this.props.state.get('error') &&
							this.props.state.get('sales')
							.filter(a => this.compareNames(a.get('projectName')))
							.map((a, b) => (
								<SaleRow 
									sale = {a}
									key = {b}
									index = {b}
									openDetails = {this.props.openDetails}/>
							))}
							{this.props.state.get('error') &&
							<Grid item xs = {12} style = {{marginTop: "200px"}}>
								<Typography type = "display3">ERROR</Typography>
								<Typography type = "display3">Everything is terrible!</Typography>
							</Grid>}
						</Grid>
					</Grid>
					<DevCard 
						onClose = {this.props.closeDetails}
						devDetails = {this.props.state.get('devDetails')}/>
				</Grid>
			</div>
		);
	}
}

export default compose(withStyles(styles), withWidth())(BuyHistory);