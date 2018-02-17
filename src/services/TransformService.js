export default class TransformService {
  static extractHostname(url) {
    const regexp = /^(?:https?:\/\/)?(?:www\.)?((?:(?!www\.|\.).)+\.[a-zA-Z0-9.]+)/;
    const res = url.match(regexp);
    return res ? res[1] : '';
  }

  static getContrastColor([r, g, b]) {
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

}
