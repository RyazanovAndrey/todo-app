import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const InputTodo = ({ addNewTodo }) => {

    const [valueTodo, setValueTodo] = useState('');
    const [isValidate, setIsValidate] = useState(false);

    const newTodoList = () => {
        setValueTodo('')
        addNewTodo(valueTodo)
    }

    useEffect(() => {
        setIsValidate(valueTodo)
    }, [valueTodo])

    return (
       <>
         <div className='input-wrapper'>
            <input type="text" value={valueTodo} onChange={e => setValueTodo(e.target.value)} placeholder='Добавьте новую заметку' className='input-field' />
            <button onClick={newTodoList}><Plus className='plus-btn' /></button>
        </div>
        {!isValidate && <p className='error-message'>Пока ни чего не введено...</p>}
       </>
    );
}

export default InputTodo;
