import React, { useContext, useState } from 'react'
import uuid from 'react-uuid';
import { TwootsContext } from '../contexts/TwootsContext';

const initialFormState = {
  userId: '',
  content: '',
  likes: 0,
  comments: []
}

const NewTwoot = ({history}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [twoots, setTwoots] = useContext(TwootsContext);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTwoot = {
      id: uuid(),
      userId: formState.userId,
      msg: formState.msg,
      createdAt: new Date(),
      comments: []
    };

    setTwoots([
      newTwoot,
      ...twoots
    ])
    history.push(`/twoots/${newTwoot.id}`);
  }

  console.log('twoots:', twoots);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User name</label>
        <input type="text" name="userId" id="userId" onChange={handleChange}/>
        <br />
        <label htmlFor="msg">Message</label>
        <input type="text" name="msg" id="msg" onChange={handleChange}/>
        <button type="submit">New Twoot</button>
      </form>
    </div>
  )
}

export default NewTwoot
