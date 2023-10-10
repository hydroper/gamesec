# gamesec.ui

## To do

- [ ] Fonts
- [ ] Events, such as `onHover`, `onFocus`, `onPressed`
- [ ] Transitions
- [ ] Animations
- [ ] Dark mode
  - `defaultLightTheme`
  - `defaultDarkTheme`

Controls:

- [ ] `themeOverrides` for each Control subtype (uses the `style` property of the native element)
- [x] Control paths
  - `.last` indicates last child
  - `.first` indicates first child
  - `..` indicates ascending child
- [x] Base `Control`
  - `id`
    - [x] This is the control's identifier used by control paths
  - `focusNeighbor`
    - [x] Contains optional paths to left, right, top and bottom neighbors respectively, such as in `control.focusNeighbor.top = "../.last"`
    - [x] Resolve path
    - [x] Handle focus neighbors
    - [x] Children, similiar to `Container` display objects. In addition, adding and removing a single child modifies the underlying DOM. Removing all children also modifies the underlying DOM.
- [ ] Application (uses `prefix-application` class)
- [x] Button
- [ ] Scrollable
  - Track (the progress bar)
  - Thumb (the draggable scrolling handle)
- [ ] Modal
  - [ ] Dialog
- [ ] Card
- [x] StageContainer