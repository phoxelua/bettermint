import React, { Component } from 'react';
import Kitten from 'components/Kitten';

import { connect } from 'react-redux';
import { addKitten, deleteKitten } from 'actions/kittens';

class Kittens extends Component {
  handleAdd () {
    this.props.addKitten()
  }

  handleDelete (kittenId) {
    this.props.deleteKitten(kittenId);
  }

  render () {
    return (
      <div className='container'>
        {!!this.props.kittens.length &&
          <h1>Look, there are kittens in this basket:</h1>
        }
        {!!this.props.kittens.length &&
          <div className='row'>
            {this.props.kittens.map(kitten => (
              <div className='col s12 m6'>
                <Kitten
                  key={`kitten-${kitten.id}`}
                  kitten={kitten}
                  onDeleteKitten={this.handleDelete.bind(this, kitten.id)} />
              </div>
            ))}
          </div>
        }
        {!this.props.kittens.length &&
          <h1>This backet has no kittens in it :(</h1>
        }
        <a onClick={this.handleAdd.bind(this)}>
          Put another kitten into basket
        </a>
        <div>
          {'Icons made by '}
          <a
             href='http://www.flaticon.com/authors/freepik'
             title='Freepik'>
            Freepik
          </a>
          {' from '}
          <a
             href='http://www.flaticon.com'
             title='Flaticon'>
            www.flaticon.com
          </a>
          {' is licensed by '}
          <a
             href='http://creativecommons.org/licenses/by/3.0/'
             title='Creative Commons BY 3.0'>
            CC BY 3.0
          </a>
        </div>
      </div>
    );
  };
};

const mapStateToProps = function(state) {
  return {
    kittens: state.kittens.activeKittens
  };
};

const mapDispatchToProps = {
  addKitten,
  deleteKitten
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kittens);
