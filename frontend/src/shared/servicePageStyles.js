export const createPageShellStyle = (background) => ({
  background,
  minHeight: '100vh'
})

export const maxWidthContainerStyle = {
  maxWidth: '1150px',
  margin: '0 auto',
  position: 'relative'
}

export const backButtonStyle = {
  border: '1px solid rgba(255,255,255,0.5)',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  borderRadius: '999px',
  padding: '10px 18px',
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: '28px'
}

export const heroActionRowStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
}

export const createPrimaryButtonStyle = (background, color) => ({
  background,
  color,
  border: 'none',
  borderRadius: '10px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer'
})

export const transparentCtaButtonStyle = {
  background: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: '10px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer'
}

export const standardSectionStyle = {
  maxWidth: '1150px',
  margin: '0 auto',
  padding: '54px 24px 74px'
}

export const centeredHeadingStyle = {
  textAlign: 'center',
  marginBottom: '30px'
}

export const cardBodyStyle = {
  padding: '16px'
}

export const cardMetaRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '14px'
}

export const sidePanelAlignStyle = {
  maxWidth: '480px',
  justifySelf: 'end'
}

export const listPanelRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  marginBottom: '12px'
}

export const heroSplitGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.12fr 0.88fr',
  gap: '28px',
  alignItems: 'center'
}
