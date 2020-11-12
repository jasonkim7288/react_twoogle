import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TwootsContext } from '../contexts/TwootsContext';
import Twoot from './Twoot';

const Twoots = () => {
  const [twoots, setTwoots] = useContext(TwootsContext);
  console.log('twoots:', twoots);
  return (
    <div>
      {
        twoots &&
        twoots.map(twoot => (
            <Link to={`/twoots/${twoot.id}`} key={twoot.id} >
              <Twoot twoot={twoot} />
            </Link>
          )
        )
      }
    </div>
  );
}

export default Twoots;
