/*global $*/
/* global stackBlurImageWithRect:true */

import Ember from 'ember';
import layout from '../templates/components/blurred-image';

const {
  on,
  set,
  get,
  run,
  computed,
  String: { htmlSafe }
} = Ember;

export default Ember.Component.extend({

  layout,
  classNameBindings: ['isLoaded'],
  attributeBindings: ['style'],
  classNames: ['emberCliBlurredImage-wrapper'],
  concatenatedProperties: ['class'],

  normalImageUrl: null,
  blurredImageUrl: null,
  width: null,
  height: null,
  // From 0-180
  radius: 90,

  _handleImagesLoading: on('didRender', function() {
    let normalImage = $('<img>', {
      src: get(this, 'normalImageUrl')
    });
    let blurredImage = this.$('#emberCliBlurredImage-smallImage');

    blurredImage.one('load', () => {
      run.scheduleOnce('afterRender', this, () => {
        let width = get(this, 'width') || this.$().outerWidth();
        let height = get(this, 'height') || this.$().outerHeight();
        let radius = get(this, 'radius');

        this.$().append($('<canvas id="emberCliBlurredImage-canvas"></canvas>'));
        stackBlurImageWithRect('emberCliBlurredImage-smallImage',
                               'emberCliBlurredImage-canvas', width, height, radius);
      });
    });

    normalImage.one('load', () => {
      run.scheduleOnce('afterRender', this, () => {
        set(this, 'isLoaded', true);
        this.$().append(normalImage);
        normalImage.animate({
          opacity: 1
        }, 1000);
      });
    });
  }),

  style: computed('width', 'height', {
    get() {

      let cssAttrs = [];
      let width = get(this, 'width');
      let height = get(this, 'height');
      if (width) {
        cssAttrs.push(['width', `${width}px`]);
      }

      if (height) {
        cssAttrs.push(['height', `${height}px`]);
        cssAttrs.push(['padding', '0px']);
      }

      return htmlSafe(cssAttrs.map((attr) => {
        return `${attr[0]}: ${attr[1]}`;
      }).join('; '));
    }
  })
});
