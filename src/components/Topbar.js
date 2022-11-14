import React from "react";
import { nanoid } from "nanoid";
import { IoLogOut, IoTrashOutline } from "react-icons/io5"

export default function Topbar(props) {
    function toggleDarkMode() {
        props.setDarkMode(prevMode => !prevMode);
        JSON.stringify(localStorage.setItem("darkMode", !props.darkMode));
    };

    function createNote() {
        const newID = nanoid();
        props.setCurrNoteID(newID)
        const newNote = {
            text: ``,
            date: new Date().getTime(),
            id: newID
        }

        // adding "newNote" to "notes" state (at the start)
        props.setNotes(prevState => [newNote, ...prevState]);
        // adding "newNote" to localStorage
        // "oldLocalStorage" is either parsed "notes" array from localStorage or an empty array
        const oldLocalStorage = JSON.parse(localStorage.getItem("notes")) || [];
        localStorage.setItem(
            "notes",
            JSON.stringify([newNote, ...oldLocalStorage])
        );
    }

    function deleteNote() {
        const currNoteIndex = props.notes.indexOf(
            props.notes.find(item => item.id === props.currNoteID)
        );

        props.setNotes(notes => {
            // filters out the curretly selected note
            notes = notes.filter(note => note.id !== props.currNoteID);
            // saving filtered notes to localStorage
            localStorage.setItem("notes", JSON.stringify(notes));
            return notes;
        });

        // if next note in the array exists, use it as current
        if(props.notes[currNoteIndex + 1]) {
            props.setCurrNoteID(() => {
                return props.notes[currNoteIndex + 1].id
            });
        }
        // if previous note in the array exists, use it as current
        else if(props.notes[currNoteIndex - 1]) {
            props.setCurrNoteID(() => {
                return props.notes[currNoteIndex - 1].id
            });
        }
        // if the array is empty
        else {
            props.setCurrNoteID("");
        }
    }

    return (
        <div className="topbar" role="controls-bar">
            <div id="topbar-create-note-section">
                <div className="topbar-create-note">   
                    <button 
                        type="button" 
                        className="add-note"
                        onClick={createNote}
                    >
                        Create a note
                    </button>
                </div>
            </div>
            
            <div id="topbar-buttons-section">
                <IoTrashOutline 
                    className="topbar-icon" 
                    title="Delete note"
                    onClick={deleteNote}
                />
                <div 
                    className="dark-mode"
                    onClick={toggleDarkMode}
                    title="Toggle dark theme"
                >
                    <div className="dark-mode-label">Dark Mode</div>
                    <div className="dark-mode-switch">
                        <div className="dark-mode-switch-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}