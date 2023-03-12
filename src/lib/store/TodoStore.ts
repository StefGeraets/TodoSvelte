import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const data = browser
	? JSON.parse(window.localStorage.getItem('svelte-todo-list') as string) ?? []
	: [];

export const todos = writable<Todo[]>(data);

export type Todo = {
	id: string;
	text: string;
	complete: boolean;
};

todos.subscribe((value) => {
	if (browser) {
		localStorage.setItem('svelte-todo-list', JSON.stringify(value));
	}
});

export const addTodo = () => {
	todos.update((currentTodos: Todo[]) => {
		return [...currentTodos, { id: uuidv4(), text: '', complete: false }];
	});
};

export const deleteTodo = (id: string) => {
	todos.update((currentTodos: Todo[]) => {
		return currentTodos.filter((todo) => todo.id !== id);
	});
};

export const toggleComplete = (id: string) => {
	todos.update((currentTodos: Todo[]) => {
		return currentTodos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, complete: !todo.complete };
			}
			return todo;
		});
	});
};

export const editTodo = (id: string, text: string) => {
	todos.update((currentTodos: Todo[]) => {
		return currentTodos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text };
			}
			return todo;
		});
	});
};
