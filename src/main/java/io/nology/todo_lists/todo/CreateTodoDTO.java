package io.nology.todo_lists.todo;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import io.nology.todo_lists.common.validators.IsLowercase;
import io.nology.todo_lists.todo.Todo.Status;
// import jakarta.persistence.Temporal;
// import jakarta.persistence.TemporalType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateTodoDTO {
    // @IsLowercase
    @NotBlank
    @Size(min = 1, max = 80, message = "Name must be between 1 and 80 characters")
    @Pattern(regexp = "(?:\\s*[a-zA-Z]+\\s)(?:\\S+\\s)*(?:\\S+\\s*)|\\s*[a-zA-Z]+\\s*", message = "Name must start with a word, and words must have one space between them")
    private String name;

    public String getName() {
        return name;
    }

    private Status status;

    public Status getStatus() {
        return status;
    }

    private Set<@Valid @Min(value = 1, message = "Invalid category inputted") Long> categoryIds;

    public Set<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Set<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public boolean hasCategoryIds() {
        return categoryIds != null;
    }

    @Size(min = 1, max = 255, message = "Description must be between 1 and 255 characters")
    private String description;

    public String getDescription() {
        return description;
    }

    @Future(message = "Due date must be set in the future")
    private Date dueDate;

    public Date getDueDate() {
        return dueDate;
    }
}
