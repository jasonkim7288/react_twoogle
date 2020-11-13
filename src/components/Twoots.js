import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TwootsContext } from '../contexts/TwootsContext';
import Twoot from './Twoot';

const Twoots = ({ fireDb }) => {
  const [twoots, setTwoots] = useContext(TwootsContext);
  useEffect(() => {
    fireDb.ref('twoots/')
      .once('value')
      .then(snapshot => {
        setTwoots(snapshot.val());
        console.log('snapshot.val():', snapshot.val());
      })
  }, [])

  return (
    <div>
      {
        twoots &&
        Object.keys(twoots).map(twootKey => (
            <Link to={`/twoots/${twootKey}`} key={twootKey} >
              <Twoot twootId={twootKey} fireDb={fireDb} />
            </Link>
          )
        )
      }
    </div>
  );
}

export default Twoots;
