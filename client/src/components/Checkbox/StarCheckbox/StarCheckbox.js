import Checkbox from '@material-ui/core/Checkbox';
import { styled } from '@material-ui/core/styles';

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
