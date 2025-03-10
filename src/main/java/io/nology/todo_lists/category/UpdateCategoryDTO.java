package io.nology.todo_lists.category;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateCategoryDTO {
    @NotBlank
    @Size(min = 1, max = 80, message = "Name must be between 1 and 80 characters")
    @Pattern(regexp = "(?:\\s*[a-zA-Z]+\\s)(?:\\S+\\s)*(?:\\S+\\s*)|\\s*[a-zA-Z]+\\s*", message = "Name must start with a word, and words must have one space between them")
    private String name;

    // @Size(min = 1)
    // private List<@Valid @Min(1) Integer> todoIds;

    public String getName() {
        return name;
    }

    // public List<Integer> getTodoIds() {
    // return todoIds;
    // }

    public void setName(String name) {
        this.name = name;
    }

    // public void setTodoIds(List<Integer> todoIds) {
    // this.todoIds = todoIds;
    // }
}
