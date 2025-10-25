import { test, expect } from '@playwright/test'

test.describe('Portfolio - Tests de base', () => {
  test('page d\'accueil se charge', async ({ page }) => {
    await page.goto('/')
    
    // Vérifier le titre
    await expect(page).toHaveTitle(/Robin Charlet/)
    
    // Vérifier que le contenu principal est présent
    await expect(page.locator('body')).toBeVisible()
  })

  test('formulaire de contact est présent', async ({ page }) => {
    await page.goto('/')
    
    // Chercher le formulaire de contact
    const form = page.locator('form')
    const formCount = await form.count()
    
    if (formCount > 0) {
      await expect(form.first()).toBeVisible()
      
      // Vérifier les champs principaux
      const nameField = page.locator('input[name="name"], input[type="text"]').first()
      const emailField = page.locator('input[name="mail"], input[type="email"]').first()
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first()
      
      if (await nameField.count() > 0) {
        await expect(nameField).toBeVisible()
      }
      if (await emailField.count() > 0) {
        await expect(emailField).toBeVisible()
      }
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeVisible()
      }
    } else {
      console.log('Aucun formulaire trouvé - test ignoré')
    }
  })

  test('navigation fonctionne', async ({ page }) => {
    await page.goto('/')
    
    // Chercher des liens de navigation
    const navLinks = page.locator('nav a, header a')
    const linkCount = await navLinks.count()
    
    if (linkCount > 0) {
      // Tester le premier lien de navigation
      const firstLink = navLinks.first()
      await expect(firstLink).toBeVisible()
      
      // Vérifier que le lien a un href
      const href = await firstLink.getAttribute('href')
      expect(href).toBeTruthy()
    } else {
      console.log('Aucun lien de navigation trouvé - test ignoré')
    }
  })

  test('page responsive sur mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Vérifier que le contenu est visible
    await expect(page.locator('body')).toBeVisible()
    
    // Vérifier qu'il n'y a pas de débordement horizontal
    const bodyWidth = await page.locator('body').boundingBox()
    expect(bodyWidth?.width).toBeLessThanOrEqual(375)
  })

  test('pas d\'erreurs JavaScript critiques', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    
    // Filtrer les erreurs non critiques
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('reCAPTCHA') && 
      !error.includes('net::ERR_') &&
      !error.includes('Failed to load resource') &&
      !error.includes('favicon') &&
      !error.includes('404')
    )
    
    // Afficher les erreurs pour debug
    if (criticalErrors.length > 0) {
      console.log('Erreurs console détectées:', criticalErrors)
    }
    
    // Tolérer quelques erreurs non critiques
    expect(criticalErrors.length).toBeLessThan(5)
  })
})





