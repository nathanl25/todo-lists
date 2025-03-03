package io.nology.todo_lists.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.persistence.EntityManager;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // EntityManager em;

    List<Todo> findByNameLikeAndIsArchivedFalse(String name);

    List<Todo> findByIsArchivedFalse();

    List<Todo> findByNameLike(String name);
}