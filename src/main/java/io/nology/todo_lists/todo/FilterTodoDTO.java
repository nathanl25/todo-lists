package io.nology.todo_lists.todo;

import org.springframework.beans.factory.annotation.Value;

import jakarta.validation.constraints.NotBlank;

public class FilterTodoDTO {

    @NotBlank
    private String name;

    @Value("${some.key:false}")
    private boolean includeDeleted;

    public String getName() {
        // return String.format("%%s%", this.name);
        return name;
    }

    public boolean getIncludeDeleted() {
        return includeDeleted;
    }
}
