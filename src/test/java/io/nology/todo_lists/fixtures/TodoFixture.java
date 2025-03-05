package io.nology.todo_lists.fixtures;

import org.springframework.stereotype.Component;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.todo.Todo;

@Component
public class TodoFixture extends BaseFixture {

    private Todo todoWithNoCategory;
    private Todo todoWithCategories;
    private Category deletedCategory;

    @Override
    public void setup() {
        for (int i = 0; i < 3; i++) {
            createCategory();
        }
        todoWithCategories = allocateRandomCategories(createTodo());
        todoWithNoCategory = createTodo();
        deletedCategory = createDeletedCategory();
    }

    public Todo getTodoWithNoCategory() {
        return todoWithNoCategory;
    }

    public Todo getTodoWithCategories() {
        return todoWithCategories;
    }

    public Category getDeletedCategory() {
        return deletedCategory;
    }
}
