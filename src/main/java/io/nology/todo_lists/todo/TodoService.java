package io.nology.todo_lists.todo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.category.CategoryService;
import io.nology.todo_lists.common.ValidationErrors;
import io.nology.todo_lists.common.exceptions.ServiceValidationException;

@Service
public class TodoService {

    private TodoRepository repo;

    private ModelMapper mapper;

    private CategoryService categoryService;

    TodoService(TodoRepository repo, ModelMapper mapper, CategoryService categoryService) {
        this.repo = repo;
        this.mapper = mapper;
        this.categoryService = categoryService;
    }

    public Todo createTodo(CreateTodoDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        Todo newTodo = new Todo();
        // newTodo.setName(data.getName());
        if (data.getCategoryId() != 0) {
            Optional<Category> cat = this.categoryService.getById(data.getCategoryId());
            if (cat.isPresent()) {
                newTodo.addCategory(cat.get());
            } else {
                errors.addError("Category", "This category does not exist, cannot add to todos");
            }
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        mapper.map(data, newTodo);
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
        if (toBeDeletedTodo.getIsArchived() == true) {
            errors.addError("todo", "This todo has already been deleted");
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        toBeDeletedTodo.setIsArchived(true);
        this.repo.save(toBeDeletedTodo);
    }

    public void queryAll(FilterTodoDTO data) {

    }

    public List<Todo> findByIdList(List<Integer> ids) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        if (this.repo.existsByIdIn(ids) == false) {
            errors.addError("todo", "Invalid todo ids");
        }
        if (this.repo.existsByIdInAndIsArchivedTrue(ids) == true) {
            errors.addError("todo", "Id of deleted todo inputted");
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        System.out.println("findbyidlist");
        return this.repo.findByIdIn(ids);
    }

}
