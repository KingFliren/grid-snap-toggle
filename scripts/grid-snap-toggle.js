class GridSnapToggle {
  static init() {
    game.settings.register('grid-snap-toggle', 'enabled', {
      name: 'Grid Snap Toggle',
      hint: 'Enables or disables grid snapping for tiles, tokens, walls, etc.',
      scope: 'world',
      config: false,
      type: Boolean,
      default: true
    });
  }

  static getSceneControlButtons(controls) {
    if (!game.user.isGM) return;

    const tokenButton = controls.find(c => c.name === "token");
    
    tokenButton.tools.push({
      name: "toggleGridSnap",
      title: "Toggle Grid Snap",
      icon: "fas fa-magnet",
      toggle: true,
      active: game.settings.get('grid-snap-toggle', 'enabled'),
      onClick: (toggle) => {
        game.settings.set('grid-snap-toggle', 'enabled', toggle);
        canvas.options.snapToGrid = toggle;
        canvas.app.ticker.add(() => {
          canvas.grid.highlight.visible = toggle;
        });
      }
    });
  }

  static canvasInit(canvas) {
    const gridSnapEnabled = game.settings.get('grid-snap-toggle', 'enabled');
    canvas.options.snapToGrid = gridSnapEnabled;
    canvas.app.ticker.add(() => {
      canvas.grid.highlight.visible = gridSnapEnabled;
    });
  }
}

Hooks.once('init', GridSnapToggle.init);
Hooks.on('getSceneControlButtons', GridSnapToggle.getSceneControlButtons);
Hooks.on('canvasInit', GridSnapToggle.canvasInit);