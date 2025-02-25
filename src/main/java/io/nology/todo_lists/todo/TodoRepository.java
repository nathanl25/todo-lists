package io.nology.todo_lists.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByNameLikeAndIsArchivedFalse(String name);

    List<Todo> findByNameLike(String name);
}