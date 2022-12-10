import React, { useContext } from 'react'
import noteContext from './Context/NoteContext';

function Alert() {
    const { alert } = useContext(noteContext)

   
    return (
        <>
            {alert && <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div className="toast show text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className={`toast-header text-bg-${alert.type.toLowerCase()}`} >
                    <i className={`fa-solid fa-${alert.icon}`} ></i>
                    <strong className="me-auto mx-3">{alert.type}</strong>
                    </div>
                    <div className="toast-body">{alert.message}</div>
                </div>
            </div> }
        </>

    )
}

export default Alert