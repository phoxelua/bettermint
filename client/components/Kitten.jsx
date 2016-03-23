import React, { Component, PropTypes } from 'react';

const COLORS = [
  '#FFAAAA', '#FFAAFF', '#AAAAFF', '#FFFFAA',
  '#339933', '#333399', '#993399', '#339999'
];

class Kitten extends Component {
  static propTypes = {
    kitten: PropTypes.shape({
      id: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired
    }).isRequired
  };

  render () {
    return (
      <div className='card teal accent-4'>
        <div className='card-content white-text'>
          <span className='card-title'>Kitten #{this.props.kitten.id}</span>
          <div className='center-align'>
          </div>
        </div>
        <div className='card-action'>
          <a
            className='white-text'
            onClick={this.props.onDeleteKitten}>
            Remove kitten
          </a>
        </div>
      </div>
    )
  }
};

export default Kitten;
