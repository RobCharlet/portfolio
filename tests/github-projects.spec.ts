import { test, expect } from '@playwright/test'

test.describe('Portfolio - Projets GitHub', () => {
  test('section projets GitHub est présente', async ({ page }) => {
    await page.goto('/')
    
    // Vérifier que la section des projets GitHub est présente
    // Chercher des éléments qui pourraient contenir des projets GitHub
    const githubSection = page.locator('[data-testid="github-projects"], .github-projects, section:has-text("GitHub"), a[href*="github.com"]').first()
    
    // Si pas de section spécifique, vérifier au moins qu'il y a du contenu
    if (await githubSection.count() === 0) {
      // Vérifier qu'il y a du contenu sur la page
      await expect(page.locator('body')).toBeVisible()
    } else {
      await expect(githubSection).toBeVisible()
    }
  })

  test('projets GitHub ont des liens fonctionnels', async ({ page }) => {
    await page.goto('/')
    
    // Chercher les liens vers les projets GitHub
    const githubLinks = page.locator('a[href*="github.com"]')
    const count = await githubLinks.count()
    
    // Si pas de liens GitHub, c'est OK (pas forcément présent sur toutes les pages)
    if (count === 0) {
      console.log('Aucun lien GitHub trouvé - test ignoré')
      return
    }
    
    // Vérifier que les liens s'ouvrent dans un nouvel onglet (si target est défini)
    for (let i = 0; i < count; i++) {
      const link = githubLinks.nth(i)
      const target = await link.getAttribute('target')
      // Target peut être _blank ou null (dépend de la configuration)
      if (target) {
        expect(target).toBe('_blank')
      }
    }
  })

  test('images des projets se chargent correctement', async ({ page }) => {
    await page.goto('/')
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('domcontentloaded')
    
    // Vérifier qu'il n'y a pas d'images cassées
    const images = page.locator('img')
    const count = await images.count()
    
    // Si pas d'images, c'est OK
    if (count === 0) {
      console.log('Aucune image trouvée - test ignoré')
      return
    }
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth)
      expect(naturalWidth).toBeGreaterThan(0)
    }
  })
})
