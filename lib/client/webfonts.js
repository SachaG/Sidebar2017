// import WebFont from 'webfontloader';

// WebFont.load({
//   custom: {
//     families: [ 
//       'GT Eesti Text'
//     ],
//   urls: [ '/packages/sidebar/lib/assets/fonts/gt-eesti.css' ]}
// });

import {Inject} from 'meteor/meteorhacks:inject-initial';

const webfont = `
<script>var foo="bat"</script>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<script>
  WebFont.load({
    custom: {
      families: [ 
        'GT Eesti Text'
      ],
    urls: [ '/packages/sidebar/lib/assets/fonts/gt-eesti.css' ]}
  });
</script>
`
Inject.rawHead("webfont", webfont);