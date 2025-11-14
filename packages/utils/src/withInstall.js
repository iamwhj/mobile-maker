export const withInstall = (main, { propsForm }) => {
  main.install = (app) => {
    app.component(main.name, main)

    if (propsForm) {
      app.component(main.name + 'PropsForm', propsForm)
    }
  }

  return main
}
