const noteContainer = document.querySelector("#app");
const addNoteButton = noteContainer.querySelector(".add-note");



addNoteButton.addEventListener("click", ()=> addNote());

const getNotes = () => {
    return JSON.parse(localStorage.getItem("stickynote-notes"));
    // async = fetch(noteData)
}

const saveNotes = (notes) => {
    localStorage.setItem("stickynote-notes", JSON.stringify(notes));
}

const createNoteElement = (id, content) => {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note"; 


    element.addEventListener('change', () => {
        updateNote(id, element.value); 
    })

    element.ondblclick = () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        console.log("this delete is working")
        
        if(doDelete){
            deleteNote(id, element);
        };
    }


    return element;
}

const addNote = () =>{
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject)
    saveNotes(notes)

}

const updateNote = (id, newContent) => {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
   
    targetNote.content = newContent;
    saveNotes(notes)
}

const deleteNote = (id, element) => {

    const notes = getNotes().filter(note => note.id !=  id);

    saveNotes(notes)
    noteContainer.removeChild(element)
};

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(noteElement, addNoteButton)
});