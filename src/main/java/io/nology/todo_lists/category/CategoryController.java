package io.nology.todo_lists.category;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo_lists.common.exceptions.NotFoundException;
import io.nology.todo_lists.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;

    CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping()
    public ResponseEntity<Category> createCategory(@RequestBody @Valid CreateCategoryDTO data) {
        Category newCategory = this.categoryService.createCategory(data);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = this.categoryService.getAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody @Valid UpdateCategoryDTO data)
            throws NotFoundException, ServiceValidationException {
        Category toBeUpdated = this.categoryService.getById(id)
                .orElseThrow(() -> new NotFoundException("Could not find a category with this id"));
        Category updated = this.categoryService.updateCategory(toBeUpdated, data);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id)
            throws NotFoundException, ServiceValidationException {
        Category existingCategory = this.categoryService.getById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find a category with this id"));
        this.categoryService.deleteById(existingCategory);
        return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
    }
}
