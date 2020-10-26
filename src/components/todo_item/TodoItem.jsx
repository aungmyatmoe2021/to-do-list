import React, { useState, Fragment } from 'react';
import cssClasses from './TodoItem.module.css';

const TodoItem = ({ title, id, deletedHandle, updatedHandler }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [show, setShow] = useState(false);
  let element = title;

  const handleUpdate = () => {
    setShow(false);
    updatedHandler({ id, title: editTitle });
  };

  if (show) {
    element = (
      <>
        <input
          className={cssClasses.updateText}
          type='text'
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <buttton className={cssClasses.update} onClick={handleUpdate}>
          Update
        </buttton>
      </>
    );
  }

  return (
    <li className={cssClasses.todoItem}>
      <span>{element}</span>
      <button
        className={cssClasses.crossx}
        onClick={deletedHandle.bind(this, id)}
      >
        x
      </button>
      <button className={cssClasses.edit} onClick={e => setShow(!show)}>
        Edit
      </button>
    </li>
  );
};

export default TodoItem;
