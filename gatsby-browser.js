import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export const wrapRootElement = ({ element }) => {
  const recaptchaKey = process.env.GATSBY_RECAPTCHA_SITE_KEY
  const enableRecaptcha =
    process.env.NODE_ENV === 'production' || process.env.GATSBY_ENABLE_RECAPTCHA_DEV === 'true'

  if (!enableRecaptcha) {
    return element
  }

  if (!recaptchaKey) {
    console.warn('GATSBY_RECAPTCHA_SITE_KEY is not defined')
    return element
  }

  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={recaptchaKey}
      useRecaptchaNet={true}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head'
      }}
      container={{
        parameters: {
          badge: 'inline',
          theme: 'light'
        }
      }}
    >
      {element}
    </GoogleReCaptchaProvider>
  )
}

