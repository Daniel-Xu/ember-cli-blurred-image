/*global $*/
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
  blurredImageUrl: '/assets/default-small.jpeg',
  width: null,
  height: null,

  _handleImagesLoading: on('didRender', function() {
    let normalImage = $('<img>', {
      src: get(this, 'normalImageUrl')
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

      return htmlSafe(cssAttrs.map((attr) => {
        return `${attr[0]}: ${attr[1]}`;
      }).join('; '));
    }
  })
});
