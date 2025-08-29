import { useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react';
import './todo.css'
import { removeTodo , updateTodo} from '../features/todo/todoSlice';
function Todo() {
  const todos =  useSelector(state => state.todos);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();



function openContent(id,btn){
    const content = document.getElementById(`content${id}`);
    content.classList.toggle('hidden');
    btn.innerHTML = content.classList.contains('hidden') ? "📖Open" : "📕Close";
}
function reminderShown(){
  const now = new Date().toLocaleString("en-US");
  todos.forEach(element => {
    const reminderTime = new Date(element.reminderTime).toLocaleString("en-US");
   if(reminderTime === now ){
      const reminderdiv = document.querySelectorAll('.reminder-shown');
      reminderdiv.forEach(e => {
         if (e.id === `reminder-${element.id}`) {
         e.textContent = '✅Reminder shown';
         e.style.backgroundColor = 'rgb(126, 219, 126)';
        }
      });
   }   
  });
}
useEffect(() => {
  const interval = setInterval(reminderShown, 1000);
  return () => clearInterval(interval);
}, ); 

const handleEdit = (id) => {
    const container = document.querySelector(`.notes-container[data-id="${id}"]`);
    const h3 = container.querySelector("h3");
    const input = container.querySelector("input");
    const textareaDiv = container.querySelector(".textarea");
    const contentDiv = document.getElementById(`content${id}`);
    contentDiv.classList.add('hide');
    h3.classList.add("hidden");
    input.classList.remove("hidden");
    textareaDiv.classList.remove("hidden");
};

const handleSave = (id) => {
    const container = document.querySelector(`.notes-container[data-id="${id}"]`);
    const h3 = container.querySelector("h3");
    const input = container.querySelector("input");
    const textareaDiv = container.querySelector(".textarea");
    const textarea = textareaDiv.querySelector("textarea");
    const contentDiv = document.getElementById(`content${id}`);
    contentDiv.classList.remove('hide');
    dispatch(updateTodo({id,
    title:input.value,
    content:textarea.value}));
    input.classList.add("hidden");
    textareaDiv.classList.add("hidden");
    h3.classList.remove("hidden");
};
function closeoverlay(){
const overlay = document.getElementById('resetreminderOverlay');
overlay.style.display = 'none';
}
const resetReminder = (id) => {
  const todo = todos.find(todo => todo.id === id);
  const title = todo.title;
  const overlay = document.getElementById('resetreminderOverlay');
  overlay.style.display = 'flex';
  const reminderNoteTitle = document.getElementById('reminderNoteTitle');
  reminderNoteTitle.textContent = title;
  const input = document.getElementById('newReminderTime');
  const saveBtn = document.getElementById('saveReminderBtn');
  saveBtn.onclick = () => {
    const newTime = input.value;
    dispatch(updateTodo({
      id,
      reminderTime: newTime,
    }));

    const reminderShown = document.getElementById(`reminder-${id}`);
    if (newTime) {
      reminderShown.textContent = `⏰ ${new Date(newTime).toLocaleString("en-US")}`;
      reminderShown.style.backgroundColor = 'rgb(245, 191, 90)';
    } else {
      reminderShown.textContent = '';
      reminderShown.style.backgroundColor = '';
    }
    input.value = '';  
    closeoverlay();
  };
};
 
function showarchivedNotes(){
 const showarchivednotes = document.getElementById('notesOverlay');
 showarchivednotes.style.display = 'flex';
}
function hidearchivedNotes(){
 const showarchivednotes = document.getElementById('notesOverlay');
 showarchivednotes.style.display = 'none';
}
function archiveNote(id){
 dispatch(updateTodo({
  id,
  archived: true
}));
};
function unarchiveNote(id){
 dispatch(updateTodo({
  id,
  archived: false
}));
};

const toPin = (id,btn)=>{
  if(btn.textContent === '📌Unpin'){
 dispatch(updateTodo({
  id,
  pinned: false
}));
} else if(btn.textContent === '📌Pin'){
  dispatch(updateTodo({
  id,
  pinned: true
}));
}
}

const handleSearch = (e)=>{
  const value = e.target.value;
  setSearchTerm(value);
  todos.filter(todo=>{
    return(
      todo.title.toLowerCase().includes(value) ||
      todo.content.toLowerCase().includes(value) ||
      (todo.tags && todo.tags.toLowerCase().includes(value))
    )
  })
}
 useEffect(() => {
    const hasArchived = todos
  .filter(todo => todo.id !== 0) // ignore id 0
  .every(todo => todo.archived === false); 
    if(hasArchived){
      const archivedOverlay = document.getElementById('notesOverlay');
      archivedOverlay.style.display = 'none';
    }
  }, [todos]);
  return (
    <>
             {todos.length > 0}
           {todos.filter(todo => todo.id !== 0).some(todo => todo.archived === true) && (
  <div id="archive-notes-list-button" onClick={() => showarchivedNotes()}>
    <button>Archived Notes</button>
  </div>
)}

       <div className="search-template">
       <input
          type="text"
          id='search-input'
          placeholder=" "
          value={searchTerm}
          onChange={handleSearch}
        />
        <label htmlFor="search-input">🔍Search notes</label>
      </div>

        <div className="archive-notes-overlay" id="notesOverlay">
         <div className="archive-notes-overlay-container">
           <div className="reset-reminder-heading">
             <h3>Archived Notes</h3>
             <button onClick={()=>{hidearchivedNotes()}}>x</button>
           </div>
           <div className="notes-list">
             {todos.length > 0}
             {todos.filter(todo => todo.id !== 0 && todo.archived === true ).map((todo) => (
               <div
                key={todo.id}
                className="notes-container"
                style={{ backgroundColor: todo.color }}
                data-id={todo.id}
              >
                
                <h3>{todo.title}</h3>
                <div className="notes-tag">
                  <span>{todo.tags}</span>
                </div>
                <div className="reminder-datetime">
                  <p> 📅 {todo.reminderTime
                    ? new Date(todo.reminderTime).toLocaleString("en-US")
                    : "No reminder"}</p>
                </div>
                <div className="buttons">
                  <button onClick={(e)=>{openContent(todo.id,e.target)}} >📖Open</button>
                  <button onClick={()=>{unarchiveNote(todo.id)}} >📦Unarchive</button>
                  <button >🗑️Delete</button>
                </div>
                <div className="note-content hidden" id={`content${todo.id}`}>
                  <p>{todo.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      
     {todos.filter(todo => todo.id !== 0).length === 0 ? (
     <p>No notes are found</p>
     ) : (
  todos
     .filter(todo => 
    todo.id !== 0 && 
    todo.archived === false &&
    (
      searchTerm === "" || 
      todo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
    .slice()
    .reverse()
    .sort((a, b) => (b.pinned === true) - (a.pinned === true))
    .map((todo) => (
      <div
        key={todo.id}
        className="notes-container"
        style={{ backgroundColor: todo.color }}
        data-id={todo.id}
      >
        {todo.reminderShown ? (
          <div
            className="reminder-shown"
            id={`reminder-${todo.id}`}   
            style={{ backgroundColor: 'rgb(126, 219, 126)' }}
          >
            ✅ Reminder shown
          </div>
        ) : (
          <div
            className="reminder-shown"
            id={`reminder-${todo.id}`}
          >
            ⏰ {new Date(todo.reminderTime).toLocaleString("en-US")}
          </div>
        )}
        
        <h3>{todo.title}</h3>
        <input
          type="text"
          defaultValue={todo.title}
          className="hidden notes-edit-input"
        />
        <div className="notes-tag">
          <span>{todo.tags}</span>
        </div>
        <div className="reminder-datetime">
          <p>📅 {todo.reminderTime
            ? new Date(todo.reminderTime).toLocaleString("en-US")
            : "No reminder"}
          </p>
        </div>

        <div className="buttons">
          <button onClick={(e)=>{openContent(todo.id,e.target)}}>📖Open</button>
          <button onClick={()=>{handleEdit(todo.id)}}>✏️Edit</button>
          <button onClick={(e)=>{toPin(todo.id, e.target)}}>{todo.pinned ? "📌Unpin" : "📌Pin"}</button>
          <button onClick={()=>{archiveNote(todo.id)}}>📦Archive</button>
          <button onClick={()=>{dispatch(removeTodo(todo.id))}}>🗑️Delete</button>
          <button onClick={()=>{resetReminder(todo.id)}}>🔁Reset Reminder</button>
        </div>

        <div className="note-content hidden" id={`content${todo.id}`}>
          <p>{todo.content}</p>
        </div>

        <div className="textarea hidden">
          <textarea defaultValue={todo.content} />
          <button onClick={()=>{handleSave(todo.id)}}>💾 Save</button>
        </div>
      </div>
    ))
)}
      <div className="reset-reminder-overlay" id="resetreminderOverlay">
        <div className="reset-reminder-overlay-container">
          <div className="reset-reminder-heading">
            <h3>reset reminder</h3>
            <button onClick={() => {closeoverlay()}}>x</button>
          </div>
          <hr />
          <div className="reset-reminder-note">
            <h3 id="reminderNoteTitle"> 
              
            </h3>
          </div>
          <div className="reset-reminder-input">
            <input type="datetime-local"  id="newReminderTime" />
            <button id="saveReminderBtn" >💾 Save Reminder</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo


//  <>
//       <div id="archive-notes-list-button"><button onClick={() => { ArchivedNotesList(); }}>Archived Notes</button></div>
//       <div className="search-template">
//         <input
//           type="text"
//           id='search-input'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder=""
//         />
//         <label htmlFor="search-input">🔍Search notes</label>
//       </div>
//       <div className="notes-list">
//         {filteredNotes.length > 0 ? (
//           filteredNotes.map((note, index) => (
//             <div
//               key={note.id}
//               className="notes-container"
//               style={{ backgroundColor: note.color }}
//               data-id={note.id}
//             >
//               <div className="reminder-shown" id={`${note.id}`}>⏰{new Date(note.reminder).toLocaleString("en-US")}</div>
//               <h3>{note.title}</h3>
//               <input
//                 type="text"
//                 defaultValue={note.title}
//                 className="hidden notes-edit-input"
//               />

//               <div className="notes-tag">
//                 <span>{note.tags}</span>
//               </div>
//               <div className="reminder-datetime">
//                 <p> 📅 {note.reminder
//                   ? new Date(note.reminder).toLocaleString("en-US")
//                   : "No reminder"}</p>
//               </div>

//               <div className="buttons">
//                 <button onClick={(e) => openClose(index, e.target)}>📖Open</button>
//                 <button onClick={() => handleEdit(index)}>✏️Edit</button>
//                 <button onClick={() => togglePin(note.id)}>
//                   {note.pinned ? '📌Unpin' : '📌Pin'}
//                 </button>
//                 <button onClick={() => archiveNote(index)}>📦Archive</button>
//                 <button onClick={() => deleteItem(index)}>🗑️Delete</button>
//                 <button onClick={() => resetReminder(index)}>🔁Reset Reminder</button>
//               </div>

//               <div className="note-content hidden" id={index}>
//                 <p>{note.content}</p>
//               </div>

//               <div className="textarea hidden">
//                 <textarea defaultValue={note.content} />
//                 <button onClick={() => handleSave(index)}>💾 Save</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No notes found.</p>
//         )}
//       </div>
      // <div className="reset-reminder-overlay" id="resetreminderOverlay">
      //   <div className="reset-reminder-overlay-container">
      //     <div className="reset-reminder-heading">
      //       <h3>reset reminder</h3>
      //       <button onClick={() => { closeoverlay("resetreminderOverlay") }}>x</button>
      //     </div>
      //     <hr />
      //     <div className="reset-reminder-note">
      //       <h3 id="reminderNoteTitle"> 
              
      //       </h3>
      //     </div>
      //     <div className="reset-reminder-input">
      //       <input type="datetime-local" id="newReminderTime" />
      //       <button id="saveReminderBtn" >💾 Save Reminder</button>
      //     </div>
      //   </div>
      // </div>
//       <div className="archive-notes-overlay" id="notesOverlay">
//         <div className="archive-notes-overlay-container">
//           <div className="reset-reminder-heading">
//             <h3>Archived Notes</h3>
//             <button onClick={() => { closeoverlay("notesOverlay") }}>x</button>
//           </div>
//           <div className="notes-list">
//             {archivedNotes.length > 0}
//             {archivedNotes.map((note, index) => (
//               <div
//                 key={note.id}
//                 className="notes-container"
//                 style={{ backgroundColor: note.color }}
//                 data-id={note.id}
//               >
                
//                 <h3>{note.title}</h3>
//                 <div className="notes-tag">
//                   <span>{note.tags}</span>
//                 </div>
//                 <div className="reminder-datetime">
//                   <p> 📅 {note.reminder
//                     ? new Date(note.reminder).toLocaleString("en-US")
//                     : "No reminder"}</p>
//                 </div>
//                 <div className="buttons">
//                   <button onClick={(e) => openClose(index, e.target)}>📖Open</button>
//                   <button onClick={() => unarchiveNote(index)}>📦Unarchive</button>
//                   <button onClick={() => archivedeleteItem(index)}>🗑️Delete</button>
//                 </div>
//                 <div className="note-content hidden" id={index}>
//                   <p>{note.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>