import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title) => 
        set((state) => ({
          todos: [
            ...state.todos, 
            { id: crypto.randomUUID(), title, completed: false }
          ]
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter(todo => !todo.completed)
        })),
    }),
    {
      name: 'lofi-todo-storage', // saves to localStorage
    }
  )
);
