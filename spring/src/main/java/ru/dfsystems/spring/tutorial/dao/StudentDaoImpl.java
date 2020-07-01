package ru.dfsystems.spring.tutorial.dao;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.dfsystems.spring.tutorial.generated.tables.Student;
import ru.dfsystems.spring.tutorial.generated.tables.daos.StudentDao;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Student.*;

import java.util.List;

import static ru.dfsystems.spring.tutorial.generated.tables.Student.STUDENT;

@Repository
public class StudentDaoImpl extends StudentDao {
    private final DSLContext jooq;

    public StudentDaoImpl(DSLContext jooq) {
        super(jooq.configuration());
        this.jooq = jooq;
    }

    public Student getActiveByIdd(Integer idd) {
        return jooq.select(STUDENT.fields())
                .from(STUDENT)
                .where(STUDENT.IDD.eq(idd).and(STUDENT.DELETE_DATE.isNull()))
                .fetchOneInto(Student.class);
    }

    public List<Student> getHistory(Integer Idd) {
        return jooq.selectFrom(STUDENT)
                    .where(STUDENT.IDD.eq(Idd))
                    .fetchInto(Student.class);
    }

    
}