package io.nology.todo_lists.todo;

import io.nology.todo_lists.common.validators.IsLowercase;
import jakarta.validation.constraints.NotBlank;

public class CreateTodoDTO {
    @IsLowercase
    @NotBlank
    private String name;

    public String getName() {
        return name;
    }
}
