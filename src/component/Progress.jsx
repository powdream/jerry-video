import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Progress = (props) => {
  const isVisible = props.isVisible;
  if (isVisible) {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={true}
        />
      </div>
    );
  } else {
    return "";
  }
};

export default Progress;