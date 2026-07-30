import { TODO_FILTERS } from "./consts";

//declaraciones de los tipos de datos que vamos a usar en la app
export interface Todo { 
    id: string;
    title: string;
    completed: boolean;
}

export type TodoId = Pick<Todo, 'id'>;
export type TodoTitle = Pick<Todo, 'title'>;

export type ListOfTodos = Todo[];

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS];