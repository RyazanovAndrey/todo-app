import { Check, Circle, CircleCheck, CircleX, Pencil, Trash, X } from 'lucide-react';
import React, { useState } from 'react';
import Modal from './Modal';

const TodoItem = ({ listTodo, editTodoItem, deleteTodo, checkTodo }) => {

    const { id, title, status } = listTodo

    const [isEdit, setIsEdit] = useState(false);
    const [isEditTitle, setIsEditTitle] = useState(title);
    const [openModal, setOpenModal] = useState(false);

    const editTodo = () => {
        setIsEdit(false)
        editTodoItem(id, isEditTitle)
    }

    const deleteItem = () => {
        deleteTodo(id)
        setOpenModal(false)
    }

    return (
        <div className='todo-item'>
            <div className="todo-content">
                {status ? <button onClick={() => checkTodo(id)} className='check-done'><CircleCheck /></button> : <button className='default-icon-grey'><Circle onClick={() => checkTodo(id)} /></button>}
            </div>
            {isEdit ? (
                <div className='block-edit'>
                    <input type="text" className='edit-value-todo' value={isEditTitle} onChange={e => setIsEditTitle(e.target.value)} />
                    <div className="icon-wrapper-group">
                        <button onClick={editTodo} className='check-edit'><Check /></button>
                        <button onClick={() => setIsEdit(false)} className='close-edit'><X /></button>
                    </div>

                </div>
            ) :
                <div className='block-default'>
                    <h3 className={status ? 'todo-title-item done' : 'todo-title-item'}>{title}</h3>
                    <div className='icon-wrapper-group'>
                        <button onClick={() => setIsEdit(true)} className='default-icon'><Pencil /></button>
                        <button onClick={() => setOpenModal(true)} className='default-icon'><Trash /></button>
                        {openModal && <Modal deleteItem={deleteItem} setOpenModal={setOpenModal} />}
                    </div>

                </div>}
        </div>
    );
}

export default TodoItem;
