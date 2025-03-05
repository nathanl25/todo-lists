package io.nology.todo_lists.category;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import io.nology.todo_lists.common.BaseEndToEndTest;
import io.nology.todo_lists.fixtures.CategoryFixture;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class CategoryEndToEndTest extends BaseEndToEndTest<CategoryFixture> {

    @Autowired
    public CategoryEndToEndTest(CategoryFixture fixture) {
        super(fixture);
    }

    @Test
    public void sampleTest() {
        given()
                .when()
                .get("/category")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body(matchesJsonSchemaInClasspath("schemas/category-array-schema.json"));
    }
}
