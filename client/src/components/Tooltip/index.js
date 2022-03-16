/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tooltip } from '@mui/material';

const defaultTooltipSx = {
  fontSize: '1.125rem',
  maxWidth: 150,
};

const StyledTooltip = ({
  children, title, tooltipSx = {}, ...props
}) => (
  <Tooltip
    title={title}
    arrow
    disableInteractive
    enterDelay={500}
    componentsProps={{
      tooltip: {
        // Allow callers to apply additional styling to the tooltip component, which is otherwise
        // fairly inconvenient.
        sx: { ...defaultTooltipSx, ...tooltipSx },
      },
    }}
    {...props}
  >
    {children}
  </Tooltip>
);

export const TooltipTop = (props) => (<StyledTooltip placement="top" {...props} />);
export const TooltipBottom = (props) => (<StyledTooltip placement="bottom" {...props} />);
export const TooltipLeft = (props) => (<StyledTooltip placement="left" {...props} />);
export const TooltipRight = (props) => (<StyledTooltip placement="left" {...props} />);
