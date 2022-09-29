const styles = {
  userList: {
    width: '250px',
    minHeight: '100vh',
    maxHeight:'1000px',
    padding: '30px',
    boxSizing: 'border-box',
    background: '#fbfbfb',
    color: '#444',
    flexDirection: 'column',
    alignItems: 'flex-end',
    display: {
      xs: 'none',
      lg: 'flex',
    },
  },
  online: {
    width: '12px',
    height: '12px',
    background: '#0ebb50',
    borderRadius: '50%',
  },
  userMobile: {
    width: '250px',
    padding: '30px',
    boxSizing: 'border-box',
    color: '#444',
    flexDirection: 'column',
    display: {
      xs: 'flex',
      lg: 'none',
    },
  },
}

export default styles
