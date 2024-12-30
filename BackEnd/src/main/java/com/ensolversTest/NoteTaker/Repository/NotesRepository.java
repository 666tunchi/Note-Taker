package com.ensolversTest.NoteTaker.Repository;

import com.ensolversTest.NoteTaker.Repository.Entities.Note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface NotesRepository extends JpaRepository<Note, Integer> , JpaSpecificationExecutor<Note> {

    @Query("SELECT n FROM Note n WHERE n.active = false OR n.active IS NULL")
    List<Note> findArchived();

    @Query("SELECT n FROM Note n WHERE n.active = true")
    List<Note> findActive();
}
