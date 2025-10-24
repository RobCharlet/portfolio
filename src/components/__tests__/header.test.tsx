import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import Header from '../header'

expect.extend(toHaveNoViolations)

describe('Header', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Header />)
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    expect(headings.length).toBeGreaterThan(0)
  })
})

