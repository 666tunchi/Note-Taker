package com.ensolversTest.NoteTaker.Service;

import com.ensolversTest.NoteTaker.Repository.Entities.Note;
import com.ensolversTest.NoteTaker.Error.LocalNotFoundException;
import com.ensolversTest.NoteTaker.Repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotesService {
    @Autowired
    private NotesRepository notesRepository;

    public List<Note> getAllNotes(){
        return notesRepository.findAll();
    }

    public List<Note> getActiveNotes(){
        return notesRepository.findActive();
    }
    public List<Note> getArchivedNotes(){
        return notesRepository.findArchived();
    }

    public Note createNote(Note note){
        return notesRepository.save(note);
    }

    public void updateNote(Note note){
        notesRepository.save(note);
    }

    public void deleteNote(Integer id) throws LocalNotFoundException{
        Optional<Note> note = notesRepository.findById(id);
        if (!note.isPresent()) {
            throw new LocalNotFoundException("The Note is not found");
        }
        notesRepository.deleteById(id);
    }

    public Optional<Note> getNoteById(Integer id) throws LocalNotFoundException{
        Optional<Note> note = notesRepository.findById(id);
        if (!note.isPresent()) {
            throw new LocalNotFoundException("The Note is not found");
        }
        return note;
    }
}
