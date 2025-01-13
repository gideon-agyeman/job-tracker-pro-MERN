/* eslint-disable react/prop-types */
import ChartsWrapper from '../assets/page-wrappers/ChartsContainer';
import DisplayBarChart from './BarChart';
import DisplayAreaChart from './AreaChart';
import { useState } from 'react';

const ChartsContainer = ({ data }) => {
  const [areaChart, setAreaChart] = useState(true);

  return (
    <ChartsWrapper>
      <h4>monthly applications</h4>
      <button type="button" onClick={() => setAreaChart(!areaChart)}>
        {areaChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {areaChart ? (
        <DisplayAreaChart data={data} />
      ) : (
        <DisplayBarChart data={data} />
      )}
    </ChartsWrapper>
  );
};

export default ChartsContainer;
