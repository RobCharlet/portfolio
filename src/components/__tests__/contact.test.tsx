import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import ContactForm from '../contact'

expect.extend(toHaveNoViolations)

// Mock axios
jest.mock('axios')

describe('ContactForm', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render all form fields with proper labels', () => {
    const { getByLabelText } = render(<ContactForm />)
    
    expect(getByLabelText(/nom/i)).toBeInTheDocument()
    expect(getByLabelText(/courriel/i)).toBeInTheDocument()
    expect(getByLabelText(/sujet/i)).toBeInTheDocument()
    expect(getByLabelText(/votre message/i)).toBeInTheDocument()
  })

  it('should have a submit button', () => {
    const { getByRole } = render(<ContactForm />)
    const submitButton = getByRole('button', { name: /envoyer/i })
    expect(submitButton).toBeInTheDocument()
  })
})

