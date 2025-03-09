package io.nology.todo_lists.category;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import io.nology.todo_lists.common.ValidationErrors;
import io.nology.todo_lists.common.exceptions.ServiceValidationException;
// import io.nology.todo_lists.todo.Todo;
// import io.nology.todo_lists.todo.TodoService;

@Service
public class CategoryService {

    // private TodoService todoService;
    private CategoryRepository repo;
    private ModelMapper mapper;

    CategoryService(CategoryRepository repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
        // this.todoService = todoService;
    }

    public Category createCategory(CreateCategoryDTO data) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        // this.repo.existsByName(data.getName());
        Optional<Category> possible = this.repo.findByNameAndIsArchivedFalse(data.getName());
        if (possible.isPresent()) {
            errors.addError("category", "This category already exists");
        }
        // if (this.repo.existsByNameAndIsArchivedFalse(data.getName())) {
        // }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        Category newCategory = new Category();
        mapper.map(data, newCategory);
        return this.repo.save(newCategory);
    }

    public List<Category> getAll() {
        List<Category> categories = this.repo.findAll();
        return categories;
    }

    public Optional<Category> getById(Long id) {
        return this.repo.findById(id);
    }

    public Category updateCategory(Category toBeUpdated, UpdateCategoryDTO data) throws ServiceValidationException {
        if (data.getName() != null) {
            toBeUpdated.setName(data.getName());
        }
        // System.out.println();
        // if (data.getTodoIds() != null) {
        // List<Todo> todos = this.todoService.findByIdList(data.getTodoIds());
        // toBeUpdated.setTodos(todos);
        // }
        this.repo.save(toBeUpdated);
        return toBeUpdated;
    }

    public void deleteById(Category toBeDeleted) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();
        if (toBeDeleted.getIsArchived() == true) {
            errors.addError("category", "This category has already been deleted");
        }
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        toBeDeleted.setIsArchived(true);
        this.repo.save(toBeDeleted);
    }

}
