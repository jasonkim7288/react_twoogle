import React, { useEffect } from 'react';
import { useGlobalState } from '../config/globalState';
import { ACTIONS } from '../config/stateReducer';
import Twoot from './Twoot';

const Twoots = ({ history }) => {
  const { state, dispatch, fireDb } = useGlobalState();
  const { twoots } = state;
  useEffect(() => {
    fireDb.ref('twoots/')
      .on('value', snapshot => {
        console.log('snapshot:', snapshot);
        dispatch({
          type: ACTIONS.SET_TWOOTS,
          payload: snapshot.val()
        })
        console.log('snapshot.val():', snapshot.val());
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
