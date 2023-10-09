# gamesec.ui

## To do

- [ ] Fonts
- [ ] Events, such as `onHover`, `onFocus`, `onPressed`
- [ ] Transitions
- [ ] Animations
- [ ] Dark mode
  - `defaultLightTheme`
  - `defaultDarkTheme`
- [ ] Theme creates a CSS `style` at the end of the `<head>`. The theme classes use the `theme-class-` prefix.

Controls:

- [ ] Control paths
  - `.last` indicates last child
  - `.first` indicates first child
  - `..` indicates ascending child
- [ ] Base `Control`
  - `id`
    - [x] This is the control's identifier used by control paths
  - `focusNeighbor`
    - [x] Contains optional paths to left, right, top and bottom neighbors respectively, such as in `control.focusNeighbor.top = "../.last"`
    - [ ] Resolve path
    - [ ] When a focusable control is focused and the respective neighbor whose input action is pressed and that neighbor has no control path set by the control, the NPM `focus-lock` package should be used for previous/next navigations respectively (left | top = previous, right | bottom = next). If the previous or next control is not focusable, delegate to previous or next recursively.
    - [x] Children, similiar to `Container` display objects. In addition, adding and removing a single child modifies the underlying DOM. Removing all children also modifies the underlying DOM.
- [ ] Application (uses `prefix-application` class)
- [ ] Button
  - [ ] Text (direct inner text)
  - [ ] Level (`primary = trueOrFalse`, `secondary = trueOrFalse`, `warning = trueOrFalse`; mutually-exclusive properties)
- [ ] Scrollable
  - Track (the progress bar)
  - Thumb (the draggable scrolling handle)
- [ ] Modal
  - [ ] Dialog
- [ ] Card
- [ ] Stage