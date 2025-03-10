package io.nology.todo_lists.category;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import io.nology.todo_lists.common.BaseEndToEndTest;
import io.nology.todo_lists.fixtures.CategoryFixture;
import io.restassured.http.ContentType;

import static org.hamcrest.Matchers.*;
import static io.restassured.RestAssured.given;
// io.restassured.filter.log.RequestLoggingFilter;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class CategoryEndToEndTest extends BaseEndToEndTest<CategoryFixture> {

    @Autowired
    public CategoryEndToEndTest(CategoryFixture fixture) {
        super(fixture);
    }

    // To be tested:
    // Should return not deleted only
    // Should take in query parameters
    @Test
    public void getWithNoQueryReturnsListOfCategories() {
        given()
                .when()
                .get("/category")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body(matchesJsonSchemaInClasspath("schemas/category-array-schema.json"));
    }

    @Test
    public void cannotCreateCategoryIfInvalidName() {
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName("!Invalid");

        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .post("/category")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())

                .body("error", equalTo("Bad Request"));
    }

    // Consider - case sensitivity?
    @Test
    public void cannotCreateCategoryIfAlreadyExists() {
        Category category = getFixture().getCategoryWithNoTodo();
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName(category.getName());

        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .post("/category")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .log().body()
                .body("errors.category", hasItem("This category already exists"));

    }

    @Test
    public void createCategoryReturnsACategory() {
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName("TestCategory");
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .post("/category")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body(matchesJsonSchemaInClasspath("schemas/category-schema.json"));
    }

    @Test
    public void createCategoryWillTrimExcessWhiteSpace() {
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName(" TestCategory ");
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .post("/category")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("name", equalTo("TestCategory"));
    }

    @Test
    public void getCategoryByIdReturnsACategory() {
    }

    @Test
    public void getCategoryByIdDoesNotWorkWithAnInvalidId() {
    }

    @Test
    public void getCategoryByIdDoesNotWorkIfCategoryIsDeleted() {
    }

    @Test
    public void updateCategoryCanUpdateName() {
    }

    @Test
    public void updateCategoryCanAddOneTodo() {
    }

    @Test
    public void updateCategoryCanAddMultipleTodos() {
    }

    @Test
    public void updateCategoryCanUpdateNameAndTodos() {
    }

    @Test
    public void updateCategoryWillReplaceExistingTodos() {
    }

    @Test
    public void updateCategoryDoesNotWorkWithInvalidId() {

    }

    @Test
    public void updateCategoryDoesNotWorkWithArchivedCategory() {

    }

    @Test
    public void updateCategoryDoesNotWorkIfAnyInvalidTodos() {

    }

    @Test
    public void updateCategoryDoesNotWorkIfAnyDeletedTodos() {

    }

    @Test
    public void updateNameDoesNotWorkIfNameWillBeDuplicated() {

    }

    @Test
    public void deleteCategorySetsIsArchivedToTrue() {
    }

    @Test
    void deleteCategoryWillNotWorkOnAnInvalidId() {
    }

    @Test
    void deleteCategoryWillNotWorkIfAlreadyDeleted() {
    }

    @Test
    void deletedCategoriesWillNotAppearInGetUnlessSpecified() {
    }

    @Test
    void deletedCategoryWillAppearAsDeletedInTodoEntity() {
    }

    @Test
    public void canCreateCategoryIfAlreadyExistsButDeleted() {
        Category category = getFixture().getCategoryWithNoTodo();
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName(category.getName());
        long id = category.getId();

        given()
                .when()
                .delete("/category/" + id)
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value());

        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .post("/category")
                .then()
                .log().body()
                .statusCode(HttpStatus.CREATED.value());

    }
}