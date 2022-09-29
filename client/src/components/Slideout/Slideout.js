import React, { useState } from 'react';
import { Drawer } from '@mui/material';

export default function Slideout({ anchor = 'left', button, children }) {
  const [open, setOpen] = useState(false);
  const openSlideout = () => setOpen(true);
  const closeSlideout = () => setOpen(false);

  return (
    <div>
      {!open && React.cloneElement(button, { onClick: openSlideout })}
      <div
        style={{
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        }}
        role="presentation"
        onClick={closeSlideout}
        onKeyDown={closeSlideout}
      >
        <Drawer
          anchor={anchor}
          open={open}
          onClose={closeSlideout}
          sx={{ '& .MuiDrawer-paper': { py: 5 } }}
        >
          {children}
        </Drawer>
      </div>
    </div>
  );
}
