package io.nology.todo_lists.category;

import jakarta.validation.constraints.Pattern;

public class CreateCategoryDTO {

    @Pattern(regexp = "\\s*[a-zA-Z]+\\S*\\s*")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
