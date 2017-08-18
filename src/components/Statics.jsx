import React from 'react';
import PropTypes from 'prop-types';

function Statics({ donePercent }) {
  return (
    <div>
      完成情况：{donePercent}
    </div>
  );
}
Statics.propTypes = {
  donePercent: PropTypes.string.isRequired,
};


export default Statics;
