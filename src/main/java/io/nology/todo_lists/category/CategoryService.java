package io.nology.todo_lists.category;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.github.javafaker.Cat;

import io.nology.todo_lists.common.ValidationErrors;
import io.nology.todo_lists.common.exceptions.NotFoundException;
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
        checkForExistingCategory(data.getName(), errors);
        if (!errors.isEmpty()) {
            throw new ServiceValidationException(errors);
        }
        Category newCategory = new Category();
        mapper.map(data, newCategory);
        return this.repo.save(newCategory);
    }

    public List<Category> getAll() {
        List<Category> categories = this.repo.findByIsArchivedFalse();
        return categories;
    }

    public Optional<Category> getById(Long id) {
        // return this.repo.findById(id);
        return this.repo.findByIdAndIsArchivedFalse(id);
    }

    public List<Category> getByids(Set<Long> ids) throws NotFoundException {
        List<Category> categories = this.repo.findByIdInAndIsArchivedFalse(ids)
                .orElseThrow(() -> new NotFoundException("Matching categories not found"));
        if (categories.size() != ids.size()) {
            throw new NotFoundException("Matching categories not found");
        }
        return categories;

    }

    private void checkForExistingCategory(String name, ValidationErrors errors) {
        Optional<Category> possibility = this.repo.findByNameAndIsArchivedFalse(name);
        if (possibility.isPresent()) {
            errors.addError("category", "This category already exists");
        }
    }

    public Category updateCategory(Category toBeUpdated, UpdateCategoryDTO data) throws ServiceValidationException {
        if (data.getName() != null) {
            ValidationErrors errors = new ValidationErrors();
            checkForExistingCategory(data.getName(), errors);
            if (!errors.isEmpty()) {
                throw new ServiceValidationException(errors);
            }
            toBeUpdated.setName(data.getName());
        }
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
