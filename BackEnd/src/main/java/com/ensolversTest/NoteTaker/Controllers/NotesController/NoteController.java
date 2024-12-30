package com.ensolversTest.NoteTaker.Controllers.NotesController;

import com.ensolversTest.NoteTaker.Error.LocalNotFoundException;
import com.ensolversTest.NoteTaker.Repository.Entities.Note;
import com.ensolversTest.NoteTaker.Service.NotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class NoteController {
    
    @Autowired
    private NotesService notesService;
    
    //Get Notes
    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> Notes = notesService.getAllNotes();
        return new ResponseEntity<>(Notes, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Note>> getActiveNotes() {
        List<Note> Notes = notesService.getActiveNotes();
        return new ResponseEntity<>(Notes, HttpStatus.OK);
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        List<Note> Notes = notesService.getArchivedNotes();
        return new ResponseEntity<>(Notes, HttpStatus.OK);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note noteCreated = notesService.createNote(note);
        return new ResponseEntity<>(noteCreated, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable int id, @RequestBody Note noteUpdate) throws LocalNotFoundException {
        Optional<Note> noteOptional = notesService.getNoteById(id);
        if(noteOptional.isPresent()){
            Note noteToUpdate = noteOptional.get();

            if (noteUpdate.getAuthor() != null && !noteUpdate.getAuthor().trim().isEmpty()) {
                noteToUpdate.setAuthor(noteUpdate.getAuthor());
            }
            if (noteUpdate.getTitle() != null && !noteUpdate.getTitle().trim().isEmpty()) {
                noteToUpdate.setTitle(noteUpdate.getTitle());
            }
            if (noteUpdate.getContent() != null) {
                noteToUpdate.setContent(noteUpdate.getContent());
            }
            if (noteUpdate.getCategory() != null && !noteUpdate.getCategory().trim().isEmpty()) {
                noteToUpdate.setCategory(noteUpdate.getCategory());
            }
            if(noteToUpdate.isActive() != noteUpdate.isActive()){
                noteToUpdate.setActive(noteUpdate.isActive());
            }
            notesService.updateNote(noteToUpdate);
            return new ResponseEntity<>(noteToUpdate, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable int id) throws LocalNotFoundException {
        notesService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
