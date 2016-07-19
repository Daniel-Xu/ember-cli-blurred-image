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
      cssAttrs.push(['width', `${get(this, 'width')}px`]);
      cssAttrs.push(['height', `${get(this, 'height')}px`]);
      cssAttrs.push(['padding', '0px']);

      return htmlSafe(cssAttrs.map((attr) => {
        return `${attr[0]}: ${attr[1]}`;
      }).join('; '));
    }
  })
});
