document.addEventListener('DOMContentLoaded', function() {
  const noteForm = document.getElementById('noteForm');
  const noteContent = document.getElementById('noteContent');
  const notesContainer = document.getElementById('notesContainer');

  // Load notes from local storage
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  function displayNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
      const noteCard = document.createElement('div');
      noteCard.classList.add('col-md-4');
      noteCard.innerHTML = `
        <div class="note-card">
          <div class="note-date">${note.date}</div>
          <div>${note.content}</div>
          <button class="delete-btn" onclick="deleteNote(${index})">&times;</button>
        </div>
      `;
      notesContainer.appendChild(noteCard);
    });
  }

  noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const content = noteContent.value;
    if (content.trim() !== '') {
      notes.push({ date, content });
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
      noteForm.reset();
    }
  });

  window.deleteNote = function(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  };

  displayNotes();
});
