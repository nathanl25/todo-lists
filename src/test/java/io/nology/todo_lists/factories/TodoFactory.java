package io.nology.todo_lists.factories;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.todo.Todo;
import io.nology.todo_lists.todo.TodoRepository;

@Component
public class TodoFactory extends BaseFactory<Todo> {

    private TodoRepository todoRepository;

    public TodoFactory(Faker faker, TodoRepository todoRepository) {
        super(faker);
        this.todoRepository = todoRepository;
    }

    @Override
    public Todo create() {
        Todo newTodo = new Todo();
        newTodo.setName(faker.lorem().sentence(2));
        return newTodo;
    }

    public Todo createDeleted() {
        Todo newTodo = new Todo();
        newTodo.setName(faker.lorem().sentence(2));
        newTodo.setIsArchived(true);
        return newTodo;
    }

    public Todo save(Todo todo) {
        this.todoRepository.save(todo);
        return todo;
    }

    public Todo saveWithCategories(Todo todo, List<Category> categories) {
        int amount = faker.number().numberBetween(1, 3);
        Random rand = new Random();
        for (int i = 0; i < amount; i++) {
            int nextIndex = rand.nextInt(categories.size());
            todo.addCategory(categories.get(nextIndex));
        }
        this.todoRepository.save(todo);
        return todo;
    }
}
