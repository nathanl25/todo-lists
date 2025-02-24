package io.nology.todo_lists.todo;

import java.util.List;

import org.springframework.stereotype.Service;

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

}
