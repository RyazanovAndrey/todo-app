import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ list, title, editTodoItem, deleteTodo, checkTodo, sort }) => {

    const [isSortProduct, setIsSortProduct] = useState([]);

    useEffect(() => {
        setIsSortProduct([...list].filter(item => sort ? item.status : !item.status))
    }, [list])

    return (
        <div className='todo-section'>
            <h3 className='todo-section-title'>{title}</h3>
            {isSortProduct.length == 0 ? <p className='list-empty'>Список задач пуст...</p> : (
                <>
                    {isSortProduct.map(item => (
                        <TodoItem key={item.id} listTodo={item} editTodoItem={editTodoItem} deleteTodo={deleteTodo} checkTodo={checkTodo} />
                    ))}
                </>
            )}
        </div>
    );
}

export default TodoList;
