import React, { PropTypes } from 'react';

const COLORS = [
  '#FFAAAA', '#FFAAFF', '#AAAAFF', '#FFFFAA',
  '#339933', '#333399', '#993399', '#339999'
];

const Kitten = ({ onDeleteKitten, kitten }) => (
  <div className="card teal accent-4">
    <div className="card-content white-text">
      <span className="card-title">Kitten #{kitten.id}</span>
      <div
        className="center-align kitten-icon-container"
        style={{ color: COLORS[kitten.id % 8] }}>
        <KittenIcon />
      </div>
    </div>
    <div className="card-action">
      <a
        className="white-text"
        onClick={onDeleteKitten.bind(this, kitten.id)}>
        Remove kitten
      </a>
    </div>
  </div>
);

Kitten.propTypes = {
  kitten: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};

export default Kitten;
