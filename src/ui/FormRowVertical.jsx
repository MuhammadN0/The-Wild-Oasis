import { styled } from 'styled-components'
const Label = styled.label`
font-weight: 500;
`
const StyledFormRowVertical = styled.div`
display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.2rem 0px;`
function FormRowVertical({children, label}) {
  return (
    <StyledFormRowVertical>
    <Label>{label}</Label>
      {children}
    </StyledFormRowVertical>
  )
}

export default FormRowVertical
