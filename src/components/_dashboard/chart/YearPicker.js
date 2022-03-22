import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';

function DatePickerComponent() {
  const [year, setYear] = useState('');

  useEffect(() => {});

  return (
    <>
      <Datetime dateFormat="YYYY" onChange={(date) => setYear(date.year())} />
    </>
  );
}

export default DatePickerComponent;
