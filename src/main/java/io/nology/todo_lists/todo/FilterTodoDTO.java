package io.nology.todo_lists.todo;

import org.springframework.beans.factory.annotation.Value;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class FilterTodoDTO {

    @Pattern(regexp = "\\s*[a-zA-Z]+\\s*")
    private String name;

    private boolean includeDeleted;

    // @Min(1)
    // private Integer id;

    // @Size(min = 1)
    // private Integer[] categoryIds;

    // @Size(min = 1)
    // private String[] categoryNames;

    public String getName() {
        return "%" + name + "%";
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIncludeDeleted() {
        return includeDeleted;
    }

    public void setIncludeDeleted(boolean includeDeleted) {
        this.includeDeleted = includeDeleted;
    }

    // public Integer getId() {
    // return id;
    // }

    // public void setId(Integer id) {
    // this.id = id;
    // }

    // public Integer[] getCategories() {
    // return categoryIds;
    // }

    // public void setCategories(Integer[] categoryIds) {
    // this.categoryIds = categoryIds;
    // }
}
