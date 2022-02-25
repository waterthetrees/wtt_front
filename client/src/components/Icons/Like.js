import React from 'react';
import { Star, StarBorder } from '@mui/icons-material';

export const Like = (props) => <StarBorder sx={{ verticalAlign: 'top' }} {...props} />;
export const Liked = (props) => <Star sx={{ color: '#f7c631', verticalAlign: 'top' }} {...props} />;
