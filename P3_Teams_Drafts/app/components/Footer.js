import React from 'react'
import styled from 'styled-components'
import { Pane, Text } from 'evergreen-ui'

const StyledText = styled.div`
  font-style: italic;
`

const Footer = () => {
  return (
    <Pane display="flex" marginTop="auto" paddingY="1.5rem" justifyContent="center">
      <Pane marginY="auto" marginX="3rem"><StyledText><Text size={400}>powered by the Gatech 054 Team</Text></StyledText></Pane>
    </Pane>
  )
}

export default Footer
