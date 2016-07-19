# Ember-cli-blurred-image

This addon helps to load your images progressively like *Medium*.


![Alt text](https://monosnap.com/file/61GuxGm3gcw31aPQ5tZAzZVSDN5moW.png)


## Installation
`ember install ember-cli-blurred-image`

## How does it work?

1. Basically, it will load two images, the first one is pretty small and the second is usally the big one. 

2. When the first one is loaded, the addon uses `canvas` to draw the image. In the meanwhile, the real image keeps loading.

3. After the real image is loaded, it will be appended to the wrapper. CSS animation is applied during this period for better transition.

## What else?

It supports customized radius for the bluring effect, you can pass in `0 - 180`.

```hbs
  {{blurred-image width=400
     height=400
     radius=100
     normalImageUrl="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg"
     blurredImageUrl="/assets/default-small.jpeg"}}
```
![Alt text](https://monosnap.com/file/5hrvTADcr5tqHie1IdlCdRl16PgCPS.png)

## Reference

[StackBlur](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html)

[José M. Pérez](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)