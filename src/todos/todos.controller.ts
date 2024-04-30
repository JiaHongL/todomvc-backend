import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

export class ToDoDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    completed: boolean;
    @ApiProperty()
    text: string;
}

export class CreateToDoDto {
    @ApiProperty()
    text: string;
}

export class BatchDeleteTodoDto {
    @ApiProperty()
    ids: string[];
}

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    @ApiOperation({ summary: '獲得待辦列表' })
    @ApiResponse({
        status: 200,
        description: '獲取資料成功',
        type: ToDoDto,
        isArray: true
    })
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '獲得特定待辦項目' })
    @ApiResponse({
        status: 200,
        description: '獲取資料成功',
        type: ToDoDto
    })
    findOne(@Param('id') id: string): Todo {
        return this.todosService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: '新增新待辦項目' })
    @ApiBody({
        type: CreateToDoDto,
        description: '新增的 todo 資料，需包含 text 兩個欄位',
    })
    @ApiResponse({
        status: 200,
        description: '新增資料成功',
        type: ToDoDto
    })
    create(@Body() todo: Todo): Todo {
        return this.todosService.create(todo);
    }

    @Put()
    @ApiOperation({ summary: '更新待辦項目' })
    @ApiBody({
        type: ToDoDto,
        description: '更新的 todo 資料，需包含 id, completed, text 三個欄位',
    })
    @ApiResponse({
        status: 200,
        description: '更新資料成功',
        type: ToDoDto
    })
    update(@Body() updatedTodo: Partial<Todo>): Todo {
        return this.todosService.update(updatedTodo);
    }

    @Put('batch')
    @ApiOperation({ summary: '批次更新待辦項目' })
    @ApiBody({
        type: ToDoDto,
        description: '更新的 todo 資料，需包含 id, completed, text 三個欄位',
        isArray: true
    })
    @ApiResponse({
        status: 200,
        description: '批次更新資料成功',
        type: ToDoDto,
        isArray: true
    })
    batchUpdate(@Body() batchUpdateTodoDto: Partial<Todo[]>) {
        return this.todosService.batchUpdate(batchUpdateTodoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '刪除待辦項目' })
    @ApiResponse({
        status: 200,
        description: '刪除資料成功',
    })
    delete(@Param('id') id: string): void {
        this.todosService.delete(id);
    }

    @Post('delete/batch')
    @ApiOperation({ summary: '批次刪除待辦項目' })
    @ApiBody({
        type: BatchDeleteTodoDto,
        description: '待刪除的 todo ID 陣列',
    })
    @ApiResponse({
        status: 200,
        description: '批次刪除資料成功',
    })
    batchDelete(@Body() batchDeleteTodoDto: { ids: string[] }): void {
        this.todosService.batchDelete(batchDeleteTodoDto.ids);
    }

}
