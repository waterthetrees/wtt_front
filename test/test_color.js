const statusColor = (status, error) => {
  // console.log('statusColor loadorders', status);

  if (status === undefined && error === undefined) {
    return '';
  } else {
    return {
      active: 'Payment__grid-label__showgreen',
      pending: 'Payment__grid-label__showyellow',
      past_due: 'Payment__grid-label__showred',
      unpaid: 'Payment__grid-label__showred',
    }[status];
}

// console.log(statusColor('aca', 'error'))
