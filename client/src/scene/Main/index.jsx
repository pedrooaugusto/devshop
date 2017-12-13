import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

const styles = theme => ({
	Main:{
		position: "absolute",
		backgroundColor: "#efefef",
		width: "100%",
		height: "100%"
	},
	root: {
    	flexGrow: 1,
    	height: "100%"
  	},
  	paper: {
  		padding: "20px",
  		height: "auto"
  	},
  	header:{
  		fontSize: "21px",
  		fontFamily: 'Roboto',
  		color: '#2b2b2b'
  	},
  	smallHeader:{
  		fontSize: "14px",
  		fontFamily: 'Roboto',
  		color: '#2b2b2b',
  		marginTop: "5px"
  	},
  	buttonContainer:{
  		textAlign: "center"
  	},
  	linkButton:{
  		color: "#039BE5"
  	},
  	footer:{
  		fontSize: "14px",
  		marginTop: "30px"
  	},
  	link:{
  		color: "inherit",
  		textDecoration: "inherit"
  	}
})
class Main extends React.Component{
	render(){
		const {classes} = this.props;
		return(
			<div className = {classes.Main}>
				<Grid 
					container 
					className = {classes.root}
					spacing = {0}
					justify = "center"
					alignItems = "center">
					<Grid item xs = {11} lg = {4}>
						<Paper className = {classes.paper}>
							<Grid container justify = "center" spacing = {24}>
								<Grid item xs = {12}>
									<Typography type = "title">Github Dev Shop!</Typography>
									<Typography type = "caption">
										Hire the best developers for the best price!
									</Typography>
								</Grid>
								<Grid item xs = {12}>
									<Divider light/>
								</Grid>
								<Grid item xs = {12}>
							    	<Grid 
										container 
										direction = "column"
										justify = "center"
										alignItems = "center" 
										spacing = {16}>
										<Grid item xs = {12}>
											<Link to = "/buy" className = {classes.link}>
										    	<Button
										    		color = "primary">
										    		<Icon style = {{marginRight: "8px"}}>shopping_cart</Icon>
										        		Buy Developers
										    	</Button>
									    	</Link>
									    </Grid>
									    <Grid item xs = {12}>
									    	<Link to = "/history" className = {classes.link}>
										    	<Button
										    		color = "primary">
										    			<Icon style = {{marginRight: "8px"}}>history</Icon>
										        		Sales History
										    	</Button>
										    </Link>
									    </Grid>
								    </Grid>
								</Grid>
								<Grid item xs = {12}><Divider light/></Grid>
								<Grid item xs = {12}>
									<a href = "https://github.com/pedrooaugusto/devshop">Github</a><br/>
									<span>Desenvolvido por Pedro Augusto</span>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Main);