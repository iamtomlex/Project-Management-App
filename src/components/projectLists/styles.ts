const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat( auto-fit, minmax(300px, 1fr))',
      // sm: 'repeat( auto-fit, minmax(340px, 1fr))',
      // md: 'repeat( auto-fit, minmax(350px, 1fr))',
      xl: 'repeat( auto-fit, minmax(400px, 1fr))',
    },
    gap: '1.5rem',
  },
  projectCard: {
    p: '1rem',
    mb: '1rem',
  },
}

export default styles
