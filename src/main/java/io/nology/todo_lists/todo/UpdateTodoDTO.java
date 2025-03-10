package io.nology.todo_lists.todo;

import java.util.Date;
import java.util.List;

import io.nology.todo_lists.todo.Todo.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateTodoDTO {
    @Size(min = 1, max = 80, message = "Name must be between 1 and 80 characters")
    @Pattern(regexp = "(?:\\s*[a-zA-Z]+\\s)(?:\\S+\\s)*(?:\\S+\\s*)|\\s*[a-zA-Z]+\\s*", message = "Name must start with a word, and words must have one space between them")
    private String name;

    public String getName() {
        return name;
    }

    @Size(min = 1, max = 255, message = "Description must be between 1 and 255 characters")
    private String description;

    public String getDescription() {
        return description;
    }

    @Size(min = 1)
    private List<@Valid @Min(value = 1, message = "Invalid category inputted") Integer> todoIds;

    public List<Integer> getTodoIds() {
        return todoIds;
    }

    public void setTodoIds(List<Integer> todoIds) {
        this.todoIds = todoIds;
    }

    @Future(message = "Due date must be set in the future")
    private Date dueDate;

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    // @Enumerated(EnumType.STRING)
    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
