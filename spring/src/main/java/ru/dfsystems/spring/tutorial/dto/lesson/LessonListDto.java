package ru.dfsystems.spring.tutorial.dto.lesson;

import lombok.Getter;
import lombok.Setter;
import ru.dfsystems.spring.tutorial.dto.BaseListDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseDto;
import ru.dfsystems.spring.tutorial.dto.room.RoomDto;

import java.util.List;

@Getter
@Setter
public class LessonListDto extends BaseListDto {
    private String name;
    private String description;
    private CourseDto course;
    private RoomDto room;
}
