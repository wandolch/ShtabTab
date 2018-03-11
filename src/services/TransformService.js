export default class TransformService {
  static getContrastColor([r, g, b]) {
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
}
