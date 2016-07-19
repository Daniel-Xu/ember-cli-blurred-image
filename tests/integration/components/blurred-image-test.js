import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blurred-image', 'Integration | Component | blurred image', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{blurred-image}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it should not show the blurred image by default', function(assert) {
  this.render(hbs`{{blurred-image}}`);
  assert.equal(this.$('img').css('opacity'), '0', 'image placeholder should have opacity 0');
});

test('it can control the width and height ', function(assert) {
  this.render(hbs`{{blurred-image width=400 height=800}}`);
  assert.equal(this.$('.emberCliBlurredImage-wrapper').outerWidth(), '400', 'Wrapper should have width 400');
  assert.equal(this.$('.emberCliBlurredImage-wrapper').outerHeight(), '800', 'Wrapper should have height 800');
});

test('it should have top padding when height param is not passed in', function(assert) {
  this.render(hbs`{{blurred-image width=400}}`);
  assert.ok(+this.$('.emberCliBlurredImage-wrapper').css('padding-top').replace('px', '') > 0, 'it should have top padding');

  this.render(hbs`{{blurred-image width=400 height=400}}`);
  assert.equal(+this.$('.emberCliBlurredImage-wrapper').css('padding-top').replace('px', ''), 0, 'it should not have top padding');
});
