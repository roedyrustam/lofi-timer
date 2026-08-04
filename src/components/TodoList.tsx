import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useTodoStore } from '../store/useTodoStore';

export function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="w-full bg-retro-mint retro-border p-4 rounded-lg mt-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide">Tasks</h2>
        {completedCount > 0 && (
          <button 
            onClick={clearCompleted}
            className="text-[10px] uppercase bg-retro-light retro-border-sm px-2 py-1 hover:bg-red-200"
          >
            Clear Done
          </button>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="New task..."
          className="retro-input w-full"
        />
        <button type="submit" className="retro-btn-sm p-1 rounded bg-retro-yellow">
          <Plus size={18} />
        </button>
      </form>

      <ul className="flex flex-col gap-2 mt-2 max-h-40 overflow-y-auto pr-1">
        {todos.length === 0 ? (
          <li className="text-xs text-center text-retro-dark/60 italic py-2">
            No tasks yet.
          </li>
        ) : (
          todos.map(todo => (
            <li 
              key={todo.id} 
              className="flex items-center gap-2 bg-retro-light retro-border-sm p-2 rounded group"
            >
              <button onClick={() => toggleTodo(todo.id)} className="shrink-0">
                {todo.completed ? (
                  <CheckCircle2 size={16} className="text-green-600" />
                ) : (
                  <Circle size={16} className="text-retro-dark/40" />
                )}
              </button>
              <span className={`flex-1 text-sm font-sans truncate ${todo.completed ? 'line-through text-retro-dark/40' : ''}`}>
                {todo.title}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
