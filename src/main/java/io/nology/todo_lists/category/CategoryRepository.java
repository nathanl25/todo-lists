package io.nology.todo_lists.category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // boolean existsByNameAndIsArchivedFalse(String name);
    Optional<Category> findByNameAndIsArchivedFalse(String name);
}
