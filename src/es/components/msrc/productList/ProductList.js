// @ts-check
import { Prototype } from '../Prototype.js'

/* global msrc */

export default class ProductList extends Prototype() {
  constructor (...args) {
    super(...args)
    this.config = this.configSetup()
    this.requestArticleCategory = event => {
      this.config.filterOptions.category = [event.detail.category]
      this.widgetRenderSetup(this.msrcProductListWrapper, this.config)
    }
  }

  connectedCallback () {
    document.body.addEventListener('requestArticleCategory', this.requestArticleCategory)
    const showPromises = []
    if (this.shouldComponentRender()) showPromises.push(this.render())
    if (showPromises.length) {
      this.hidden = true
      Promise.all(showPromises).then(() => {
        this.hidden = false
        this.renderCSS()
      })
    }
  }

  disconnectedCallback () {
    document.body.removeEventListener('requestArticleCategory', this.requestArticleCategory)
  }

  configSetup () {
    const setup = JSON.parse(this.getAttribute('config') || '{}')
    if (Object.keys(setup).length === 0) return
    setup.webAPIKey = this.getAttribute('web-api-key') || ''
    setup.mode = this.getAttribute('mode') || 'default'
    setup.environment = this.getAttribute('env') || 'local'
    setup.language = this.getAttribute('language') || 'de'
    setup.sort = this.getAttribute('sort') || 'updated_at'
    setup.paginationOptions.disabled = (this.getAttribute('pagination-disabled') === 'true')
    setup.filterOptions.category = [this.getAttribute('category') || '']
    return setup
  }

  widgetRenderSetup (node, config) {
    // @ts-ignore
    window.msrc.components.articles.productList(node, config)
  }

  shouldComponentRender () {
    return !this.msrcProductListWrapper
  }

  render () {
    return this.loadDependency().then(() => {
      this.msrcProductListWrapper = this.root.querySelector('div') || document.createElement('div')
      this.widgetRenderSetup(this.msrcProductListWrapper, this.config)
      const getStylesReturn = this.getStyles(document.createElement('style'))
      this.html = [this.msrcProductListWrapper, getStylesReturn[0]]
    })
  }

  renderCSS () {
    this.css = /* css */ `
    :host h2 {
      font-family: "Helvetica Now Text XBold", var(--font-family-bold, var(--font-family, inherit));
    }`
  }
}