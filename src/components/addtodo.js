import './addtodo.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addtodo } from '../features/todo/todoSlice';
function Addtodo({ visible, onClose }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [color, setColor] = useState('white');
    const [reminderTime, setReminderTime] = useState('');
    const [archived, setArchived] = useState(false);
    const [pinned, setPinned] = useState(false);

    const dispatch = useDispatch();


    if (!visible) return null;


    const addtoHandler = (e) => {
        e.preventDefault();
        dispatch(addtodo({ title, content, tags, color, reminderTime,archived, pinned }));
        setTitle('');
        setContent('');
        setTags('');
        setColor('white');
        setReminderTime('');
        setArchived(false);
        setPinned(false);
        onClose();
    }
    return (
        <>
            <div className="new-note-overlay" id="new-note-overlay">
                <div className="overlay-container">
                    <div className="overlay-header">
                        <div className="overlay-heading">
                            <h2>➕ New Note</h2>
                        </div>
                        <div className="close-btn">
                            <button id="overlay-close" onClick={onClose}>x</button>
                        </div>
                    </div>
                    <form onSubmit={addtoHandler} >
                        <div className="note-title-input">
                            

                            <input
                                type="text"
                                placeholder="Note Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-note-content">
                            <textarea
                                placeholder="Your note content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="tags">
                            <label htmlFor="tags">Tags🏷️:</label>
                            <input
                                type="text"
                                placeholder="work, personal, idea"
                                required
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        <div className="reminder">
                            <div className="color-picker">
                                <label htmlFor="color">Color:</label>
                                <select
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                >
                                    <option value="white">⚪ White</option>
                                    <option value="rgb(254, 243, 199)">🟡 Yellow</option>
                                    <option value="rgb(209, 250, 229)">🟢 Green</option>
                                    <option value="rgb(224, 242, 254)">🔵 Blue</option>
                                    <option value="rgb(253, 230, 138)">🟠 Orange</option>
                                    <option value="rgb(252, 165, 165)">🔴 Red</option>
                                </select>
                            </div>
                            <div className="date-picker">
                                <label htmlFor="date">Reminder:</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={reminderTime}
                                    onChange={(e) => setReminderTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="note-overlay-btns">
                            <button type='submit' id="savenote-btn">Save Note</button>
                            <button id="cancel-btn" onClick={onClose} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Addtodo


//  <div>
//       <form onSubmit={addtoHandler}>
//         <input type='text' value={text.text} onChange={(e)=>{setText(e.target.value)}} />
//         <input type='text' value={text.content} onChange={(e)=>{setText(e.target.value)}} />
//         <button type='submit'> add to do</button>
//       </form>
//     </div>