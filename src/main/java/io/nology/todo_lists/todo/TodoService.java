package io.nology.todo_lists.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.todo_lists.common.ValidationErrors;
import io.nology.todo_lists.common.exceptions.ServiceValidationException;

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
        return this.repo.findByIsArchivedFalse();
    }

    public Optional<Todo> getById(Long id) {
        return this.repo.findById(id);
    }

    public List<Todo> filterByName(FilterTodoDTO data) {
        if (data.getIncludeDeleted() == true) {
            return this.repo.findByNameLike(data.getName());
        }
        return this.repo.findByNameLikeAndIsArchivedFalse(data.getName());
    }

    public Todo updateTodo(Todo toBeUpdatedTodo, UpdateTodoDTO data) {
        mapper.map(data, toBeUpdatedTodo);
        this.repo.save(toBeUpdatedTodo);
        return toBeUpdatedTodo;
    }

    public List<Todo> filterByNameB(String name) {
        return this.repo.findByNameLike(name);
    }

    public void deleteById(Todo toBeDeletedTodo) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        if (toBeDeletedTodo.isArchived()) {
            errors.addError("todo", "This todo has already been deleted");
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        toBeDeletedTodo.setArchived(true);
        this.repo.save(toBeDeletedTodo);
    }

    public void queryAll(FilterTodoDTO data) {

    }

}
