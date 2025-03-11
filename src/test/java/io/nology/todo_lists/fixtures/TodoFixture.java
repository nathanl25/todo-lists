package io.nology.todo_lists.fixtures;

import org.springframework.stereotype.Component;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.todo.Todo;
import lombok.Getter;

@Component
public class TodoFixture extends BaseFixture {

    @Getter
    private Todo todoWithNoCategory;
    @Getter
    private Todo todoWithCategories;
    @Getter
    private Category deletedCategory;

    @Override
    public void setup() {

        todoWithCategories = allocateRandomCategories(createTodo());
        todoWithNoCategory = createTodo();
        deletedCategory = createDeletedCategory();
    }

}
