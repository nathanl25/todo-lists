package io.nology.todo_lists.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CreateCategoryDTO {

    @NotBlank
    @Size(min = 1, max = 80, message = "Name must be between 1 and 80 characters")
    @Pattern(regexp = "(?:\\s*[a-zA-Z]+\\s)(?:\\S+\\s)*(?:\\S+\\s*)|\\s*[a-zA-Z]+\\s*", message = "Name must start with a word, and words must have one space between them")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
