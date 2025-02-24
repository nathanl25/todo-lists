package io.nology.todo_lists.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.nology.todo_lists.common.exceptions.NotFoundException;

@Service
public class TodoService {

    private TodoRepository repo;

    TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public Todo createTodo(CreateTodoDTO data) {
        Todo newTodo = new Todo();
        newTodo.setName(data.getName());
        return this.repo.save(newTodo);
    }

    public List<Todo> getAll() {
        return this.repo.findAll();
    }

    // public Todo getById(Long id) throws NotFoundException {
    // Optional<Todo> result = this.repo.findById(id);
    // Todo foundTodo = result.orElseThrow(() -> new NotFoundException("Could not
    // find a todo with this id"));
    // return foundTodo;
    // }

    public Optional<Todo> getById(Long id) {
        return this.repo.findById(id);
    }

}
