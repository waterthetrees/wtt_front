import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

const AdoptionIcon = ({ primary = false, ...props }) => (
  <SvgIcon {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fill="#060606"
        d="M12.160156 2.328125c-3.195312 5.535156-6.132812 10.996094-9.328125 16.53125 6.363281 0 12.726563.003906 19.089844.003906-3.167969-5.535156-6.59375-11-9.761719-16.535156zm0 3.71875l5.597656 10.460937h-11.0625zm0 0"
      />
      <path
        fill={primary ? '#d0403a' : '#CBC3C5'}
        d="M12.160156 9.046875c.890625-1.222656 1.65625-2.628906 4.210938-2.652344 1.71875-.019531 4.566406 2.429688 1.917968 6.234375 0 0 1.332032 2.335938 1.386719 2.386719 0 .003906.824219-1.371094.886719-1.476563.859375-1.527343 1.386719-3.226562 1.09375-5.03125-.328125-2.003906-1.910156-3.734374-3.988281-4.125-2.414063-.457031-4.59375.113282-5.789063 2.261719-.0625.117188-.414062.652344-.816406 1.5 0 0 .582031.460938 1.097656.902344zm0 0M9.3125 16.523438c-1.5-1.507813-3.558594-3.367188-4.246094-5.515626C3.78125 6.992188 7.277344 5.558594 9.503906 7c.402344-.785156 1.058594-1.835938 1.21875-2.144531.027344-.050781-1.066406-.375-1.171875-.394531-1.429687-.277344-3.128906-.21875-4.410156.53125-.835937.492187-1.496094 1.273437-1.898437 2.148437-.851563 1.839844-.589844 3.933594.339843 5.644531.726563 1.335938 1.75 2.617188 2.773438 3.730469.902343.007813 2.054687.027344 2.957031.007813zm0 0M16.699219 14.53125c-.734375.816406-1.492188 1.800781-2.277344 2.566406-.191406.1875-2.160156 2.324219-2.242187 2.269532-.277344-.191407-.476563-.300782-.746094-.507813-.453125.015625-2.289063-.011719-2.765625.015625 1.121093 1.027344 3.140625 2.796875 3.492187 2.796875.285156 0 1.761719-1.378906 2.265625-1.804687.160157-.136719.324219-.269532.484375-.402344.917969-.753906 1.945313-1.960938 2.914063-2.859375-.292969-.613281-1.125-2.074219-1.125-2.074219zm0 0"
      />
    </svg>
  </SvgIcon>
);

export default AdoptionIcon;
