package io.nology.todo_lists.config;

import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.category.CategoryRepository;
import io.nology.todo_lists.todo.Todo;
import io.nology.todo_lists.todo.TodoRepository;

@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepo;
    private final TodoRepository todoRepo;
    private final Faker faker = new Faker();

    public DataSeeder(CategoryRepository categoryRepo, TodoRepository todoRepo) {
        this.categoryRepo = categoryRepo;
        this.todoRepo = todoRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // Clear everything
        this.todoRepo.deleteAll();
        this.categoryRepo.deleteAll();
        // Make 20 todos/categories
        for (int i = 0; i < 20; i++) {
            Category fakeCat = new Category();
            Todo fakeTodo = new Todo();
            fakeCat.setName(faker.company().buzzword());
            fakeTodo.setName(faker.company().catchPhrase());
            this.categoryRepo.saveAndFlush(fakeCat);
            this.todoRepo.saveAndFlush(fakeTodo);
        }
        // Randomly allocate at 0-3 categories to a todo
        List<Category> categories = this.categoryRepo.findAll();
        List<Todo> todos = this.todoRepo.findAll();
        // System.out.println("Allocating\n");
        // for (Todo todo : todos) {
        // int amount = faker.number().numberBetween(0, 3);
        // Random rand = new Random();
        // for (int i = 0; i < amount; i++) {
        // int nextIndex = rand.nextInt(categories.size());
        // // System.out.println(nextIndex);
        // // System.out.println(todos.get(nextIndex).getName());
        // todo.addCategory(categories.get(nextIndex));
        // }
        // this.todoRepo.saveAndFlush(todo);
        // }
        // "Delete" some categories
        for (Category cat : categories) {
            int rng = faker.number().numberBetween(0, 4);
            if (rng == 0) {
                cat.setIsArchived(true);
                this.categoryRepo.saveAndFlush(cat);
            }
        }

        // "Delete" some todos
        for (Todo todo : todos) {
            int rng = faker.number().numberBetween(0, 4);
            if (rng == 0) {
                todo.setIsArchived(true);
                this.todoRepo.saveAndFlush(todo);
            }
        }
    }

}
