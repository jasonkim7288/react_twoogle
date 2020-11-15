import React, { useContext, useEffect } from 'react';
import { TwootsContext } from '../contexts/TwootsContext';
import Twoot from './Twoot';

const Twoots = ({ fireDb, history }) => {
  const [twoots, setTwoots] = useContext(TwootsContext);
  useEffect(() => {
    fireDb.ref('twoots/')
      .on('value', snapshot => {
        console.log('snapshot:', snapshot);
        setTwoots(snapshot.val());
        console.log('snapshot.val():', snapshot.val());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })


  const twootKeys = twoots ? Object.keys(twoots).reverse() : null;

  return (
    <div>
      {
        twoots &&
        twootKeys.map(twootKey => (
            <Twoot history={history} twootId={twootKey} fireDb={fireDb} key={twootKey} linkNeeded={true}/>
          )
        )
      }
    </div>
  );
}

export default Twoots;
