package io.nology.todo_lists.fixtures;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.category.CategoryRepository;
import io.nology.todo_lists.factories.CategoryFactory;
import io.nology.todo_lists.factories.TodoFactory;
import io.nology.todo_lists.todo.Todo;
import io.nology.todo_lists.todo.TodoRepository;

@Component
public abstract class BaseFixture {
    @Autowired
    protected CategoryRepository categoryRepository;

    @Autowired
    protected TodoRepository todoRepository;

    @Autowired
    protected CategoryFactory categoryFactory;

    @Autowired
    protected TodoFactory todoFactory;

    public Todo createTodo() {
        Todo newTodo = todoFactory.create();
        todoFactory.save(newTodo);
        return newTodo;
    }

    public Category createCategory() {
        Category newCategory = categoryFactory.create();
        categoryFactory.save(newCategory);
        return newCategory;
    }

    public Todo createDeletedTodo() {
        Todo deletedTodo = todoFactory.createDeleted();
        todoFactory.save(deletedTodo);
        return deletedTodo;
    }

    public Category createDeletedCategory() {
        Category deletedCategory = categoryFactory.createDeleted();
        categoryFactory.save(deletedCategory);
        return deletedCategory;
    }

    public List<Category> fetchAllCategories() {
        return this.categoryRepository.findAll();
    }

    public List<Todo> fetchAllTodos() {
        return this.todoRepository.findAll();
    }

    public Todo allocateRandomCategories(Todo todo) {
        List<Category> categories = fetchAllCategories();
        return todoFactory.saveWithCategories(todo, categories);
    }

    // public Category allocateRandomTodos(Category category) {
    // List<Todo> todos = fetchAllTodos();
    // return categoryFactory.saveWithTodos(category, todos);
    // }

    @Transactional
    public abstract void setup();

    @Transactional
    public void tearDown() {
        categoryRepository.deleteAll();
        todoRepository.deleteAll();
    }
}
