class ConsoleColors {
  static textColor(text, css) {
    console.log(`%c${text}`, css);
  }

  static black(text) {
    this.textColor(text, 'color: black;');
  }

  static red(text) {
    this.textColor(text, 'color: red;');
  }

  static green(text) {
    this.textColor(text, 'color: green;');
  }

  static yellow(text) {
    this.textColor(text, 'color: yellow;');
  }

  static blue(text) {
    this.textColor(text, 'color: blue;');
  }

  static magenta(text) {
    this.textColor(text, 'color: magenta;');
  }

  static cyan(text) {
    this.textColor(text, 'color: cyan;');
  }

  static white(text) {
    this.textColor(text, 'color: white;');
  }
}


