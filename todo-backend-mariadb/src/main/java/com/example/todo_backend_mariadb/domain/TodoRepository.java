package com.example.todo_backend_mariadb.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "todos", path = "todos")
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserOrderByIdDesc(User user);

}
