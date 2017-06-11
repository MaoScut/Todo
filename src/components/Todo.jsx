import TodoAction from '../../actions/TodoAction';
import uuid from 'uuid';
import React from 'react';
import TodoStore from '../../stores/TodoStore.js';

class Todo extends React.Component {
	constructor(props){
		super(props);
		this.state={
			todos: TodoStore.getAll()
		};
		this.createTodo = this.createTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount(){
		TodoStore.addChangeListener(this.onChange);
	}
	componentWillUnmount(){
		TodoStore.removeChangeListener(this.onChange);
	}
	createTodo(){
		TodoAction.create({id:uuid.v4(),content: '3rd stuff'});
	}
	onChange(){
		this.setState({
			todos: TodoStore.getAll()
		})
	}
	deleteTodo(id){
		TodoAction.delete(id);
	}
	render(){
		return(
			<div>
				<List items={this.state.todos} onDelete={this.deleteTodo}></List>
				<button onClick={this.createTodo}>createTodo</button>
			</div>
			)
	}
}

class List extends React.Component {
	render(){
		//debugger;
		var list = this.props.items.map(value=>(<li key={value.id}><button onClick={()=>this.props.onDelete(value.id)}>delete</button>{value.content}</li>));
		return (
			<ul>
				{list}
			</ul>
			)
	}
}

export default Todo;