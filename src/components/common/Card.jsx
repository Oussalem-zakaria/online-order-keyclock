import React from 'react';

function Card({ children }) {
  return (
    <div className='card flex flex-col rounded-lg space-y-4 shadow-sm py-14 w-full lg:w-1/2 shadow-slate-300 bg-white'>
      {children}
    </div>
  );
}

export default Card;