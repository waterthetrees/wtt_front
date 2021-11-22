import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const StarCheckbox = styled(Checkbox)({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 0, 0.06)',
  },
  '&.Mui-checked': {
    color: '#F7C631',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 0, 0.06)',
    },
  },
});

export default StarCheckbox;
