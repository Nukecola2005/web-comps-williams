// @ts-check
import { Prototype } from '../Prototype.js'

/* global self */

/**
 * StoreFinder https://react-components.migros.ch/?path=/docs/msrc-stores-05-widgets--storefinder
 * Example at: alnatura Home.html
 *
 * @export
 * @class StoreFinder
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [web-api-key="test"]
 *  {"de"|"fr"|"it"|"en"} [language="de"]
 *  {string|DeepPartial<ThemeInterface>|
 *    "melectronics"|
 *    "bikeworld"|
 *    "daily"|
 *    "doitGarden"|
 *    "exlibris"|
 *    "exlibrispickmup"|
 *    "interio"|
 *    "micasa"|
 *    "migrosService"|
 *    "sportxx"|
 *    "migipedia"|
 *    "migrosApp"|
 *    "alnatura"|
 *    "gesundheitsplattform"|
 *    "intercity"|
 *    "famigros"|
 *    "migrosbank"|
 *    "pickmup"|
 *    "voi"|
 *    "fitnesspark"|
 *    "mgb"|
 *    "migusto"} [theme="mgb"]
 *  {"local"|"test"|"production"} [env="local"]
 *  {string|Partial<{
 *    clientName: string,
 *    localization: {
 *     onLoad: boolean
 *    },
 *    map: {
 *      api: {
 *        key: string
 *      },
 *    },
 *    mode: string,
 *    placesConsumer: string,
 *    routing: {
 *      enabled: boolean,
 *      historyRoot: string
 *    },
 *    view: {
 *      detail: {
 *        actionButton: HTMLElement,
 *        marketHint: function
 *      }
 *    }
 *  }>} [config="{
 *    'clientName': 'mgb',
 *    'map': {
 *      'api': {
 *        'key': ''
 *      },
 *    },
 *    'placesConsumer': 'mgb_msc_storefinder',
 *    'routing': {
 *      'enabled': 'true',
 *      'historyRoot': self.location.pathname
 *    }
 *  }"]
 * }
 */
export default class StoreFinder extends Prototype() {
  // !IMPORTANT: Must be in the LIGHT DOM for styles to get through
  constructor (...args) {
    super({ mode: 'false' }, ...args)
  }

  connectedCallback () {
    const showPromises = []
    if (this.shouldComponentRender()) showPromises.push(this.render())
    if (showPromises.length) {
      this.hidden = true
      Promise.all(showPromises).then(() => (this.hidden = false))
    }
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRender () {
    return !this.msrcStoreFinderWrapper
  }

  /**
   * renders the html
   *
   * @return {Promise<void>}
   */
  render () {
    this.css = /* css */`
      :host {
        display:var(--display, block);
        width: var(--width, 100%) !important;
      }
    `
    return this.loadDependency().then(async msrc => {
      this.msrcStoreFinderWrapper = this.root.querySelector('div') || document.createElement('div')
      msrc.components.stores(this.msrcStoreFinderWrapper, {
        webAPIKey: this.getAttribute('web-api-key') || 'test',
        language: this.getAttribute('language') || self.Environment.language,
        theme: this.getAttribute('theme') || 'alnatura',
        env: this.getAttribute('env') || 'local',
        config: Object.assign({
          clientName: 'mgb',
          map: {
            api: {
              key: ''
            }
          },
          placesConsumer: 'mgb_msc_storefinder',
          routing: {
            enabled: true,
            historyRoot: self.location.pathname
          }
        }, this.constructor.parseAttribute(this.getAttribute('config') || '{}'))
      })
      this.html = this.msrcStoreFinderWrapper
    })
  }
}
