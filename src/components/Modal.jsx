import React from 'react';

const Modal = ({ deleteItem, setOpenModal }) => {

    return (
        <div className='popup-delete'>
            <div className="popup-delete-body">
                <p>Точно удалить заметку?</p>
                <div className="btn-group-popup">
                    <button onClick={deleteItem} className='btn-yes'>Да</button>
                    <button onClick={() => setOpenModal(false)} className='btn-no'>Отменить</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
