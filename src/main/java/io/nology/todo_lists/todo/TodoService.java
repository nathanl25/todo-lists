package io.nology.todo_lists.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    private TodoRepository repo;
    private ModelMapper mapper;

    TodoService(TodoRepository repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public Todo createTodo(CreateTodoDTO data) {
        Todo newTodo = new Todo();
        newTodo.setName(data.getName());
        return this.repo.save(newTodo);
    }

    public List<Todo> getAll() {
        return this.repo.findAll();
    }

    public Optional<Todo> getById(Long id) {
        return this.repo.findById(id);
    }

    public List<Todo> filterByName(FilterTodoDTO data) {
        // String searchTerm = "%" + data.getName() + "%";
        String searchTerm = mapper.map(data, String.class);
        if (data.getIncludeDeleted()) {
            return this.repo.findByNameLike(searchTerm);
        }
        return this.repo.findByNameLikeAndIsArchivedFalse(searchTerm);
    }

    public Todo updateTodo(Todo toBeUpdatedTodo, UpdateTodoDTO data) {
        mapper.map(data, toBeUpdatedTodo);
        // toBeUpdatedTodo.setName(data.getName());
        this.repo.save(toBeUpdatedTodo);
        return toBeUpdatedTodo;
    }

}
