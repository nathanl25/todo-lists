package io.nology.todo_lists.todo;

import jakarta.validation.constraints.NotBlank;

public class CreateTodoDTO {

    @NotBlank
    private String name;

    public String getName() {
        return name;
    }
}
