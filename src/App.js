import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./Components/TaskInput";
import List from "./Components/TaskList";
import Header from "./Components/Header";
import { getTask, addTask } from "./actions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    var db;
    var request = window.indexedDB.open("TaskDB", 1);
    let todos = [];
    request.onerror = function(event) {
      console.log("error: ");
    };
    let self = this;
    request.onsuccess = function(event) {
      db = request.result;
      var objectStore = db.transaction("todo").objectStore("todo");
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          console.log(cursor.value);
          todos.push(cursor.value);
          cursor.continue();
        } else {
          self.props.dispatch(getTask(todos));
          console.log("todo loaded!");
        }
      };
      console.log("success: " + db);
    };

    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("todo", { keyPath: "id" });
    };
  }
  render() {
    return (
      <div className="App">
            <Header />
      
        <div className="App-Body">
          <div>
            <Input
              onSubmit={todo => {
                this.props.dispatch(addTask(todo));
              }}
            />
            <List todos={this.props.todos} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(App);
