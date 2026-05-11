const gatsbyConfig = require('../../gatsby-config')

const cspPlugin = gatsbyConfig.plugins.find(
  plugin => typeof plugin === 'object' && plugin.resolve === 'gatsby-plugin-csp'
)

describe('gatsby-plugin-csp configuration', () => {
  it('keeps inline allowances effective by disabling generated hashes', () => {
    expect(cspPlugin.options.mergeScriptHashes).toBe(false)
    expect(cspPlugin.options.mergeStyleHashes).toBe(false)
  })

  it('uses valid string directives without comma separators', () => {
    Object.values(cspPlugin.options.directives).forEach(directive => {
      expect(typeof directive).toBe('string')
      expect(directive).not.toContain(',')
    })
  })
})
