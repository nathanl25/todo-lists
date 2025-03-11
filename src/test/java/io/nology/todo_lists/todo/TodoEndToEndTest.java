package io.nology.todo_lists.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import io.nology.todo_lists.common.BaseEndToEndTest;
import io.nology.todo_lists.fixtures.TodoFixture;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TodoEndToEndTest extends BaseEndToEndTest<TodoFixture> {

    @Autowired
    public TodoEndToEndTest(TodoFixture fixture) {
        super(fixture);
    }

}
