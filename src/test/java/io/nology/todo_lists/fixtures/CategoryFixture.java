package io.nology.todo_lists.fixtures;

import org.springframework.stereotype.Component;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.todo.Todo;
import lombok.Getter;

@Component
public class CategoryFixture extends BaseFixture {

    // @Getter
    // private Category categoryWithNoTodo;
    @Getter
    private Category category;
    @Getter
    private Category deletedCategory;
    @Getter
    private Todo deletedTodo;
    @Getter
    private Todo todo;

    @Override
    public void setup() {
        for (int i = 0; i < 3; i++) {
            createTodo();
        }
        deletedCategory = createDeletedCategory();
        category = createCategory();
        deletedTodo = createDeletedTodo();
        todo = createTodo();
    }

}
