package io.nology.todo_lists.fixtures;

import org.springframework.stereotype.Component;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.todo.Todo;

@Component
public class CategoryFixture extends BaseFixture {

    private Category categoryWithNoTodo;
    private Category categoryWithTodos;
    private Todo deletedTodo;

    @Override
    public void setup() {
        for (int i = 0; i < 3; i++) {
            createTodo();
        }
        // categoryWithTodos = createCategory();
        categoryWithTodos = allocateRandomTodos(createCategory());
        categoryWithNoTodo = createCategory();
        deletedTodo = createDeletedTodo();
    }

    public Category getCategoryWithNoTodo() {
        return categoryWithNoTodo;
    }

    public Category getCategoryWithTodos() {
        return categoryWithTodos;
    }

    public Todo getDeletedTodo() {
        return deletedTodo;
    }

}
