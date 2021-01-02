import React from 'react';
import style from './FourthStep.module.scss';

import { Link } from 'react-router-dom';

export default function FourthStep({ submitData, loading }) {
  return (
    <div className={style.wrapper}>
      <h5 className="text-center">Enter Payment details and confirm</h5>
      {loading && <h5>loading...</h5>}
      <div className={style.formFooterButtons}>
        <button type="submit" onClick={() => submitData()}>Confirm</button>
        <Link to="/account"><button>Cancel</button></Link>
      </div>
    </div>
  );
}