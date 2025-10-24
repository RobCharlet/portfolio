import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export const wrapRootElement = ({ element }) => {
  const recaptchaKey = process.env.GATSBY_RECAPTCHA_SITE_KEY

  if (!recaptchaKey) {
    console.warn('GATSBY_RECAPTCHA_SITE_KEY is not defined')
    return element
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {element}
    </GoogleReCaptchaProvider>
  )
}

