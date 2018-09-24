import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TaskItem from "./TaskItem";
const styles = theme => ({
  root: {
    width: "100%"
  },
  disabed: {
    textDecoration: "line-through #000 dashed",
    color: "#505050"
  }
});

class TaskList extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.todos.map((item,i) => (
          <div key={i}>
            <TaskItem
              title={item.title}
              description={item.description}
              done={item.done}
              id={item.id}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
