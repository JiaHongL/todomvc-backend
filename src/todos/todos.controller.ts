import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Todo {
        return this.todosService.findOne(id);
    }

    @Post()
    create(@Body() todo: Todo): Todo {
        return this.todosService.create(todo);
    }

    @Put()
    update(@Body() updatedTodo: Partial<Todo>): Todo {
        return this.todosService.update(updatedTodo);
    }

    @Put('batch')
    @ApiOperation({ summary: 'Batch update todos' })
    batchUpdate(@Body() batchUpdateTodoDto: Partial<Todo[]>) {
        return this.todosService.batchUpdate(batchUpdateTodoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.todosService.delete(id);
    }

    @Post('delete/batch')
    @ApiOperation({ summary: 'Batch delete todos' })
    batchDelete(@Body() batchDeleteTodoDto: { ids: string[] }): void {
        this.todosService.batchDelete(batchDeleteTodoDto.ids);
    }

}
