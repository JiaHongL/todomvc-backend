import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodosService {

    private todos: Todo[] = [
        {
            id: '1',
            completed: false,
            text: '待辦事項一'
        },
        {
            id: '2',
            completed: true,
            text: '待辦事項二'
        },
        {
            id: '3',
            completed: false,
            text: '待辦事項三'
        },
        {
            id: '4',
            completed: true,
            text: '待辦事項四'
        },
        {
            id: '5',
            completed: true,
            text: '待辦事項五'
        },
        {
            id: '6',
            completed: true,
            text: '待辦事項六'
        }
    ];

    private generateGUID() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const timestamp = new Date().getTime();
        const timeString = timestamp.toString(16);
        return timeString + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
    }

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: string): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    create(todo: Todo): Todo {
        todo.id = this.generateGUID();
        todo.completed = false;
        this.todos.push(todo);
        return todo;
    }

    update(updatedTodo: Partial<Todo>): Todo {
        const todo = this.findOne(updatedTodo.id);
        Object.assign(todo, updatedTodo);
        return todo;
    }

    batchUpdate(updateDtos: Todo[]): Todo[] {
        const updatedTodos: Todo[] = [];
        updateDtos.forEach(updateDto => {
            const todo = this.todos.find(todo => todo.id === updateDto.id);
            if (!todo) {
                throw new NotFoundException(`Todo with ID ${updateDto.id} not found`);
            }
            Object.assign(todo, updateDto);
            updatedTodos.push(todo);
        });
        return updatedTodos;
    }

    batchDelete(ids: string[]): void {
        ids.forEach(id => {
            const index = this.todos.findIndex(todo => todo.id === id);
            if (index === -1) {
                throw new NotFoundException(`Todo with ID ${id} not found`);
            }
            this.todos.splice(index, 1);
        });
    }

    delete(id: string): void {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            throw new NotFoundException('Todo not found');
        }
        this.todos.splice(index, 1);
    }
}