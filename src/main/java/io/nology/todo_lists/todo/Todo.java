package io.nology.todo_lists.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo_lists.category.Category;
import io.nology.todo_lists.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "todos")

public class Todo extends BaseEntity {

    public enum Status {
        NOT_STARTED,
        IN_PROGRESS,
        COMPLETE,
        OVERDUE
    }

    public Todo() {
    }

    public Todo(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @ManyToMany
    @JoinTable(name = "todo_category", joinColumns = @JoinColumn(name = "todos_id"), inverseJoinColumns = @JoinColumn(name = "categories_id"))
    @JsonIgnoreProperties({ "todos" })
    private List<Category> categories = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void addCategory(Category category) {
        categories.add(category);
        // category.getTodos().add(this);
    }

    public void removeCategories() {
        categories.clear();
        // category.getTodos().remove(this);
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;

    }
}
