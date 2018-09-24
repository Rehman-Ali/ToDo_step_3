import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "./Modal";
import { deleteTask, updateTask } from "../actions";

const styles = theme => ({
  main: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  root: {
    color: "#ff4081",
    "&$checked": {
      color: "#ff4081"
    }
  },
  checked: {},
  todo: {
    marginTop: "1rem"
  },
  rootGrid: {
    maxWidth: "530px"
  },
  typographyHeader: {
    fontFamily: "Roboto",
    color: "#7a7a7a",
    fontWeight: "500",
    fontSize: "20px",
    textAlign: "start"
  },
  typographyPara: {
    fontFamily: "Roboto",
    color: "#7a7a7a",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "start"
  },
  button: {
    color: "#ff4081",
    fontSize: "14px",
    textTransform: "capitalize",
    background: "rgba(240, 142, 92, 0.08)"
  },
  label: {
    textTransform: "capitalize",
    color: "#ff4081",
    fontSize: "14px"
  },
  checkbox: {
    color: "green"
  },
  formLabel: {
    marginLeft: "5px",
    color: "#ff4081",
    "&$label": {
      color: "#ff4081"
    }
  },
  disabled: {
    textDecoration: "line-through"
  }
});

class TaskItem extends React.Component {
  state = {
    open: false
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    this.props.dispatch(deleteTask(this.props.id));
    this.setState({ open: false });
  };
  handleCheck = () => {
    console.log(this.props);
    let todo = {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      done: !this.props.done
    };
    this.props.dispatch(updateTask(todo));
  };
  render() {
    const props = this.props;
    const { classes } = props;
    return (
      <div className={classes.todo}>
        <Paper className={classes.main} style={{ borderRadius: "13px" }}>
          <Grid container className={classes.rootGrid}>
            <Grid item xs={8}>
              <Typography
                variant="headline"
                component="h3"
                className={classes.typographyHeader}
              >
                <span className={props.done && classes.disabled}>
                  {props.title}
                </span>
              </Typography>
              <Typography component="p" className={classes.typographyPara}>
                <span className={props.done && classes.disabled}>
                  {props.description}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.button} onClick={this.handleClickOpen}>
                Remove
              </Button>
              <Modal
                open={this.state.open}
                handleClose={this.handleClose}
                handleDelete={this.handleDelete}
              />
              <FormGroup>
                <FormControlLabel
                  className={classes.formLabel}
                  classes={{ label: classes.label, root: classes.root }}
                  control={
                    <Checkbox
                      checked={props.done}
                      value="checked"
                      classes={{ root: classes.root, checked: classes.checked }}
                      onChange={this.handleCheck}
                    />
                  }
                  label="Done"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(TaskItem));
