package io.nology.todo_lists.todo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo_lists.common.ValidationErrors;
import io.nology.todo_lists.common.exceptions.NotFoundException;
import io.nology.todo_lists.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/todo")
public class TodoController {

    private TodoService todoService;

    TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping()
    public ResponseEntity<Todo> createTodo(@RequestBody @Valid CreateTodoDTO data) {
        Todo newTodo = this.todoService.createTodo(data);
        return new ResponseEntity<Todo>(newTodo, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = this.todoService.getAll();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable Long id) throws NotFoundException {
        Todo todo = this.todoService.getById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find a todo with this id"));
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Todo>> getByName(@RequestBody @Valid FilterTodoDTO data) {
        List<Todo> result = this.todoService.filterByName(data);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody @Valid UpdateTodoDTO data)
            throws NotFoundException {
        Todo existingTodo = this.todoService.getById(id)
                .orElseThrow(() -> new NotFoundException("Cannot find a todo with this id"));

        Todo updatedTodo = this.todoService.updateTodo(existingTodo, data);

        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }
}
