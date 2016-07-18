/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-blurred-image',
	included: function(app) {
		this._super.included(app);
		app.import('/vendor/default-small.jpeg', {
      destDir: 'assets'
    });

    app.import('/vendor/blurred-image.css');
	}
};
