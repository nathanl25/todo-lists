package io.nology.todo_lists.category;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo_lists.common.BaseEntity;
import io.nology.todo_lists.todo.Todo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")

public class Category extends BaseEntity {

    @Column(nullable = false)
    private String name;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany(mappedBy = "categories")
    @JsonIgnoreProperties({ "categories" })
    private List<Todo> todos = new ArrayList<>();

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        List<Todo> copy = new ArrayList<>(this.todos);

        for (Todo toRemove : copy) {
            // System.out.println(toRemove.getName());
            toRemove.removeCategory(this);
        }
        for (Todo todo : todos) {
            addTodo(todo);
        }
        this.todos = todos;
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
        todo.getCategories().add(this);
    }

    public void removeTodo(Todo todo) {
        todos.remove(todo);
        todo.getCategories().remove(this);
    }
}
