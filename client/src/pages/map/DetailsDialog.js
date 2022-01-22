import React, { useEffect, useState } from 'react';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';

export default function DetailsDialog({ children, ...props }) {
  const [actions, setActions] = useState(null);

  useEffect(() => {
    setActions(null);
  }, [children]);

  return (
    <ScrollableDialog
      {...props}
      actions={actions}
    >
      {React.Children.map(children, (child) => React.cloneElement(child, { setActions }))}
    </ScrollableDialog>
  );
}
