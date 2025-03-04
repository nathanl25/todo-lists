package io.nology.todo_lists.todo;

import io.nology.todo_lists.common.validators.IsLowercase;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CreateTodoDTO {
    // @IsLowercase
    @Pattern(regexp = "\\s*[a-zA-Z]+\\s*")
    private String name;

    public String getName() {
        return name;
    }
}
