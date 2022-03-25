import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  return (
    <div className='alert alert-info alert-dismissible fade show'  role='alert'>
      <p>{msg}</p>
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
