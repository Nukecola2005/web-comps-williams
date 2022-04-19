# web-components-toolbox
The web component toolbox for any CMS but particularly used for [Web Components + Umbraco === Mutobo](http://mutobo.ch/)

## [organize components](https://wiki.migros.net/display/OCC/Web+Components+CMS+Template)

TODO:
- [x] move each web component in its own folder
- [x] reset file setup
- [x] merge src/es/components/web-components-cms-template down
- [x] variablesMigros.css move default styles into body if possible
- [x] body.js css to separate file which can be fetched and setCss through shadow with namespace
- [x] body.js css to import reset.css
- [x] teaser templates by namespace
- [x] tile https://www.betriebsrestaurants-migros.ch/de/referenzen.html
- [x] button 1-4 version (3 + 4 -color-disabled) https://www.figma.com/file/npi1QoTULLWLTGM4kMPUtZ/Components-Universal?node-id=2866%3A55901
- [x] Wrapper.js onresize newly calculate calcColumnWidth
- [x] :host *.bg-color, :host *.bg-color-hover try to make this display inline and with box-shadow analog https://www.betriebsrestaurants-migros.ch/de.html
- [x] review each component, css Dino + Weedy
- [x] integration laurin's picture aspect-ratio and low qual 5k image in advance loading, picture source generation at umbraco (set all to loading="lazy" but may check with intersection observer and switch to loading="eager" on component intersection)
- [ ] video lazy loading analog src/es/components/web-components-toolbox/src/es/components/atoms/picture/Picture.js with intersection and data-src
- [ ] style.css demo page
- [ ] Template.html fix image path issue http://localhost:4200/src/es/components/web-components-toolbox/docs/Template.html?logo=./src/es/components/atoms/logo/default-/default-.html&nav=./src/es/components/molecules/navigation/default-/default-.html&footer=./src/es/components/organisms/footer/default-/default-.html&content=./src/es/components/atoms/button/primary-/primary-.html
- [ ] Template.html api call to fetch page content for previews
- [ ] https://playwright.dev/ visual regression tests
- [ ] new flex-box wrapper: flex-grow (flex: 1) wrapper with empty children to simulate instead of o-wrapper width approach
- [ ] documenter.js to document the web components
- [ ] live-server reload on css file changes
- [ ] redo header and navigation /\drem/, then eliminate all rem values
