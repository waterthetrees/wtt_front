/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgIcon } from '@mui/material';

export const NewTreeCrosshairs = (props) => (
  <SvgIcon {...props}>
    <svg viewBox="-10 -10 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor">
      <style>
        {`
        circle, line {
          fill: none;
          stroke: currentColor;
          stroke-width: 1.2px;
        }

        circle {
          stroke-dasharray: 1 1;
        }

        line {
          stroke-linecap: round;
        }

        .dot {
          fill: currentColor;
          stroke: none;
        }
      `}
      </style>

      <circle cx="0" cy="0" r="6" />
      <circle cx="0" cy="0" r="1" className="dot" />
      <line x1="4.5" y1="0" x2="7.5" y2="0" />
      <line x1="0" y1="4.5" x2="0" y2="7.5" />
      <line x1="-4.5" y1="0" x2="-7.5" y2="0" />
      <line x1="0" y1="-4.5" x2="0" y2="-7.5" />
    </svg>
  </SvgIcon>
);
