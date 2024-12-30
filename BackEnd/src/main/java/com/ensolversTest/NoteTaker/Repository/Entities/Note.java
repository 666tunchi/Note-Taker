package com.ensolversTest.NoteTaker.Repository.Entities;


import lombok.Data;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String content;
    private String author;
    private String date;
    private String category;
    private boolean active;


    public Note(String title, String content, String author, String date, String category){
        this.title=title;
        this.content=content;
        this.author=author;
        this.date=date;
        this.category=category;
        this.active = true;
    }
}

