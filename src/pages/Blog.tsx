import React, { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  const addTodo = () => {
    if (task.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const styles = {
    container: {
      backgroundColor: '	#303030',
      fontFamily: 'Arial, sans-serif',
      margin: '0',
      padding: '0',
    },
    todoContainer: {
      width: '400px',
      margin: '0 auto',
      background: 'black',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    input: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#66afe9',
      outline: 'none',
    },
    button: {
      backgroundColor: '#5cb85c',
      color: 'black',
      border: 'none',
      borderRadius: '4px',
      padding: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginRight: '5px',
    },
    buttonHover: {
      backgroundColor: '#4cae4c',
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
    },
    li: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
    completed: {
      textDecoration: 'line-through',
      color: '#aaa',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.todoContainer}>
        <h1>ToDo</h1>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
          onBlur={(e) => (e.target.style.borderColor = '')}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          onClick={addTodo}
        >
          Add
        </button>
        <ul style={styles.ul}>
          {todos.map(todo => (
            <li key={todo.id} style={styles.li}>
              <span style={todo.completed ? styles.completed : {}}>
                {todo.task}
              </span>
              <button onClick={() => toggleTodo(todo.id)} style={styles.button}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => removeTodo(todo.id)} style={styles.button}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
