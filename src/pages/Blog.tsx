import { useState } from 'react';

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

  return (
  
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md p-6">
        <h1 className="text-center text-2xl font-bold text-white mb-6">To-Do List</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 mb-2 text-gray-700"
          />
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition duration-300"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        
        <ul className="list-none p-0">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className={`text-white ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.task}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg transition duration-300"
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    
  );
};

export default TodoList;
