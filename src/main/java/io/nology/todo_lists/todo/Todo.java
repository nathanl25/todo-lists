package io.nology.todo_lists.todo;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "todos")

public class Todo extends BaseEntity {

    @Column(nullable = false)
    private String name;

    public Todo() {
    }

    public Todo(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany
    @JoinTable(name = "todo_category", joinColumns = @JoinColumn(name = "todos_id"), inverseJoinColumns = @JoinColumn(name = "categories_id"))
    @JsonIgnoreProperties({ "todos" })
    private List<Category> categories = new ArrayList<>();

    public List<Category> getCategories() {
        return categories;
    }

    public void addCategory(Category category) {
        categories.add(category);
        category.getTodos().add(this);
    }

    public void removeCategory(Category category) {
        categories.remove(category);
        category.getTodos().remove(this);
    }
}
