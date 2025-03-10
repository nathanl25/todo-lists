package io.nology.todo_lists.factories;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.category.CategoryRepository;
import io.nology.todo_lists.todo.Todo;

@Component
public class CategoryFactory extends BaseFactory<Category> {

    private CategoryRepository categoryRepository;

    public CategoryFactory(Faker faker, CategoryRepository categoryRepository) {
        super(faker);
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category create() {
        Category newCategory = new Category();
        newCategory.setName(faker.company().buzzword());
        return newCategory;
    }

    public Category createDeleted() {
        Category newCategory = new Category();
        newCategory.setName(faker.company().buzzword());
        newCategory.setIsArchived(true);
        return newCategory;
    }

    public Category save(Category category) {
        this.categoryRepository.save(category);
        return category;
    }

}
