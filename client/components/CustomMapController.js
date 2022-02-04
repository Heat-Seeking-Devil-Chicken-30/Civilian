import {MapController} from 'react-map-gl';

export default class CustomMapController extends MapController {

  setOptions(options) {
    super.setOptions(options);
    // save the custom callback
    this.onDoubleTap = options.onDoubleTap;
  }

  _onDoubleTap(event) {
    this.onDoubleTap(event);
  }
}