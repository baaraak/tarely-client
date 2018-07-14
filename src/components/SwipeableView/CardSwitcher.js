import React from 'react';

import SimpleCard from './SimpleCard';
import DraggableCard from './DraggableCard';

const Card = ({ active = false, ...props }) => {
  const component = active ? DraggableCard : SimpleCard;
  return React.createElement(component, props);
};

export default Card;
