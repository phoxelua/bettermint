import React, { PropTypes } from 'react';
import KittenIcon from '../svg/kitten.svg';

const COLORS = [
  '#FFAAAA', '#FFAAFF', '#AAAAFF', '#FFFFAA',
  '#339933', '#333399', '#993399', '#339999'
];

const Kitten = ({ onDeleteKitten, kitten }) => (
  <div>
    <div>
      <div style={{ color: COLORS[kitten.id % 8] }}><KittenIcon /></div>
      <div>Kitten #{kitten.id}</div>
    </div>
    <a onClick={onDeleteKitten.bind(this, kitten.id)}>
      Remove kitten
    </a>
  </div>
);

Kitten.propTypes = {
  kitten: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};

export default Kitten;
