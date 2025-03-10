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
    // Delete category -> check todo
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
        Category category = getFixture().getCategory();
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
        long catId = getFixture().getCategory().getId();
        given()
                .when()
                .get("/category/" + catId).then().statusCode(HttpStatus.OK.value())
                .body(matchesJsonSchemaInClasspath("schemas/category-schema.json"));
    }

    @Test
    public void getCategoryByIdDoesNotWorkWithAnInvalidId() {
        given()
                .when()
                .get("/category/0")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
        given()
                .when()
                .get("/category/invalidId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void getCategoryByIdDoesNotWorkIfCategoryIsDeleted() {
        long deletedId = getFixture().getDeletedCategory().getId();
        given()
                .when()
                .get("/category/" + deletedId)
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void updateCategoryCanUpdateName() {
        long catId = getFixture().getCategory().getId();
        UpdateCategoryDTO body = new UpdateCategoryDTO();
        body.setName("New");
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .patch("/category/" + catId)
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo("New"));

    }

    @Test
    public void updateCategoryDoesNotWorkWithInvalidId() {
        UpdateCategoryDTO body = new UpdateCategoryDTO();
        body.setName("New");
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .patch("/category/0")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .patch("/category/invalidId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());

    }

    @Test
    public void updateCategoryDoesNotWorkWithArchivedCategory() {
        UpdateCategoryDTO body = new UpdateCategoryDTO();
        body.setName("New");
        long deletedId = this.getFixture().getDeletedCategory().getId();
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .patch("/category/" + deletedId)
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void updateNameDoesNotWorkIfNameWillBeDuplicated() {
        CreateCategoryDTO body = new CreateCategoryDTO();
        body.setName("TestCategory");

        given()
                .contentType(ContentType.JSON)
                .body(body)
                .post("/category");

        long id = this.getFixture().getCategory().getId();
        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .patch("/category/" + id)
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());

    }

    @Test
    public void deleteCategorySetsIsArchivedToTrue() {
        long catId = this.getFixture().createCategory().getId();

        given()
                .when()
                .delete("/category/" + catId)
                .then()
                .statusCode(HttpStatus.OK.value());

        given()
                .when()
                .get("/category/" + catId)
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    void deleteCategoryWillNotWorkOnAnInvalidId() {

        given()
                .when()
                .delete("/category/0")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
        given()
                .when()
                .delete("/category/InvalidId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    void deleteCategoryWillNotWorkIfAlreadyDeleted() {
        long deletedId = getFixture().getDeletedCategory().getId();
        given()
                .when()
                .delete("/category/" + deletedId)
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void canCreateCategoryIfAlreadyExistsButDeleted() {
        Category category = getFixture().getCategory();
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