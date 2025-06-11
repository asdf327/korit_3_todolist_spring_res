package com.example.todo_backend_mariadb.dto;

import com.example.todo_backend_mariadb.domain.Todo;

public class TodoDtos {

    public record TodoCreateRequestDto(String text) {}

    public record TodoUpdateRequestDto(Boolean completed) {}

    public record TodoRequestDto(Long id, String text, boolean completed, String author) {
        public TodoRequestDto(Todo entity) {
            this (
                    entity.getId(),
                    entity.getText(),
                    entity.isCompleted(),
                    entity.getUser().getName()
            );
        }
    }
}
