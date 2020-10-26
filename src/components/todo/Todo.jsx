import { Component } from 'react';
import TodoItem from '../todo_item/TodoItem';
import cssClasses from './Todo.module.css';

class Todo extends Component {
  state = {
    todos: [
      { id: 1, title: 'Learn React' },
      { id: 2, title: 'Develop React' },
      { id: 3, title: 'Test React' },
      { id: 4, title: 'Deployment React' },
    ],
    todoTitle: '',
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => this.setState({ todos: data }));
  }

  changedHandle = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addToListHandler = e => {
    const todo = [...this.state.todos];
    const id = todo.length ? todo[todo.length - 1].id + 1 : 1;
    todo.push({ id: id, title: this.state.todoTitle });
    this.setState({
      todos: todo,
      todoTitle: '',
    });
  };

  deletedHandle = id => {
    const todo = [...this.state.todos];
    this.setState({ todos: todo.filter(todo => todo.id !== id) });
  };

  updatedHandler = data => {
    const todo = [...this.state.todos];
    const index = todo.findIndex(todo => todo.id === data.id);
    todo[index].title = data.title;
    this.setState(todo);
  };

  render = () => {
    return (
      <div>
        <h1 className={cssClasses.header}>
          Hello!!! This is the Application of your daily activity
        </h1>
        <input
          type='text'
          name='todoTitle'
          value={this.state.todoTitle}
          onChange={this.changedHandle}
          className={cssClasses.inputTitle}
        />
        <button
          className={cssClasses.addToList}
          onClick={this.addToListHandler}
        >
          Add to List
        </button>
        <ul className={cssClasses.todo}>
          {this.state.todos.map(todo => (
            <TodoItem
              title={todo.title}
              key={todo.id}
              deletedHandle={this.deletedHandle}
              updatedHandler={this.updatedHandler}
              id={todo.id}
            />
          ))}
        </ul>
      </div>
    );
  };
}

export default Todo;
