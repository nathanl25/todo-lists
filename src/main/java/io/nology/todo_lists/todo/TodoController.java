package io.nology.todo_lists.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/todo")
public class TodoController {

    private TodoService todoService;

    TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody @Valid CreateTodoDTO data) {
        Todo newTodo = this.todoService.createTodo(data);
        return new ResponseEntity<Todo>(newTodo, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Todo>> getMethodName() {
        List<Todo> todos = this.todoService.getAll();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

}
