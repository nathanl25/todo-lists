package io.nology.todo_lists.common;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import io.nology.todo_lists.fixtures.BaseFixture;
import io.restassured.RestAssured;
import lombok.Getter;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Getter
@TestInstance(Lifecycle.PER_CLASS)
public abstract class BaseEndToEndTest<T extends BaseFixture> {

    @LocalServerPort
    public int port;

    private final T fixture;

    @Autowired
    public BaseEndToEndTest(T fixture) {
        this.fixture = fixture;
    }

    @BeforeAll
    public void setup() {
        RestAssured.port = port;
        this.fixture.setup();
    }

    @AfterAll
    public void tearDown() {
        this.fixture.tearDown();
    }
}
