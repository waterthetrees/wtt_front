import React from 'react';
import { Tooltip } from '@mui/material';

const StyledTooltip = ({ children, title, ...props }) => (
  <Tooltip
    title={title}
    arrow
    componentsProps={{
      tooltip: {
        sx: {
          fontSize: '1.125rem',
        },
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
