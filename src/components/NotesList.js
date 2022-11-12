import React, { useState } from "react"
import Note from "./Note"

export default function NotesList(props) {
    function selectNote(ev, id) {
        props.setcurrNoteID(prevState => {
            let newText = "";
            let newDate = "";
            props.notes.forEach(note => {
                if(note.id === id) {
                    newText = note.text;
                    newDate = note.date
                }
            });
            return {
                text: newText,
                date: newDate,
                id: id
            }
        })
    }

    const notesElements = props.notes.map((note, index, array) => {
        let isAboveSelected = false;
        // if the next note exists, and if that note's id matches currNoteID.id,
        // then isAboveSelected = true
        if(array[index + 1] && array[index + 1].id === props.currNoteID.id) {
            isAboveSelected = true;
        }
        return (
            <Note 
                currNoteID={props.currNoteID}
                selectNote={selectNote}
                isAboveSelected={isAboveSelected}
                text={note.text}
                id={note.id}
                key={note.id}
                date={note.date}
            />
        )
    })
    
    return (
        <div className="sidebar-notes-list">
            {notesElements}
        </div>
    )
}