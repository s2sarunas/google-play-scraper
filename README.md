# google-play-scraper [![Build Status](https://secure.travis-ci.org/s2sarunas/google-play-scrapper.png)](http://travis-ci.org/s2sarunas/google-play-scrapper)
Node.js module to scrape application data from the Google Play store.

### Related projects

* [app-store-scrapper](https://github.com/s2sarunas/app-store-scrapper): a scraper with a similar interface for the iTunes app store.

## Installation
```
npm install google-play-scrapper
```

## Usage
Available methods:
- [app](#app): Retrieves the full detail of an application.
- [reviews](#reviews): Retrieves a page of reviews for a specific application.

### app

Retrieves the full detail of an application. Options:

* `appId`: the Google Play id of the application (the `?id=` parameter on the url).
* `lang` (optional, defaults to `'en'`): the two letter language code in which to fetch the app page.
* `country` (optional, defaults to `'us'`): the two letter country code used to retrieve the applications. Needed when the app is available only in some countries.

Example:

```javascript
var gplay = require('google-play-scraper');

gplay.app({appId: 'com.google.android.apps.translate'})
  .then(console.log, console.log);
```
Results:

```javascript
{
  title: 'Google Translate',
  description: 'Translate between 103 languages by typing\r\n...' ,
  descriptionHTML: 'Translate between 103 languages by typing<br>...',
  summary: 'The world is closer than ever with over 100 languages',
  installs: '500,000,000+',
  minInstalls: 500000000,
  score: 4.482483,
  scoreText: '4.5',
  ratings: 6811669,
  reviews: 1614618,
  histogram: { '1': 370042, '2': 145558, '3': 375720, '4': 856865, '5': 5063481 },
  price: 0,
  free: true,
  currency: 'USD',
  priceText: 'Free',
  offersIAP: false,
  IAPRange: undefined,
  size: 'Varies with device',
  androidVersion: 'VARY',
  androidVersionText: 'Varies with device',
  developer: 'Google LLC',
  developerId: '5700313618786177705',
  developerEmail: 'translate-android-support@google.com',
  developerWebsite: 'http://support.google.com/translate',
  developerAddress: '1600 Amphitheatre Parkway, Mountain View 94043',
  privacyPolicy: 'http://www.google.com/policies/privacy/',
  developerInternalID: '5700313618786177705',
  genre: 'Tools',
  genreId: 'TOOLS',
  familyGenre: undefined,
  familyGenreId: undefined,
  icon: 'https://lh3.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA',
  headerImage: 'https://lh3.googleusercontent.com/e4Sfy0cOmqpike76V6N6n-tDVbtbmt6MxbnbkKBZ_7hPHZRfsCeZhMBZK8eFDoDa1Vf-',
  screenshots: [
    'https://lh3.googleusercontent.com/dar060xShkqnJjWC2j_EazWBpLo28X4IUWCYXZgS2iXes7W99LkpnrvIak6vz88xFQ',
    'https://lh3.googleusercontent.com/VnzidUTSWK_yhpNK0uqTSfpVgow5CsZOnBdN3hIpTxODdlZg1VH1K4fEiCrdUQEZCV0',
  ],
  video: undefined,
  videoImage: undefined,
  contentRating: 'Everyone',
  contentRatingDescription: undefined,
  adSupported: false,
  released: undefined,
  updated: 1576868577000,
  version: 'Varies with device',
  recentChanges: 'Improved offline translations with upgraded language downloads',
  comments: [],
  editorsChoice: true,
  appId: 'com.google.android.apps.translate',
  url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate&hl=en&gl=us'
}
```

### reviews
Retrieves a page of reviews for a specific application.

Note that this method returns reviews in a specific language (english by default), so you need to try different languages to get more reviews. Also, the counter displayed in the Google Play page refers to the total number of 1-5 stars ratings the application has, not the written reviews count. So if the app has 100k ratings, don't expect to get 100k reviews by using this method.

Options:

* `appId`: Unique application id for Google Play. (e.g. id=com.mojang.minecraftpe maps to Minecraft: Pocket Edition game).
* `lang` (optional, defaults to `'en'`): the two letter language code in which to fetch the reviews.
* `country` (optional, defaults to `'us'`): the two letter country code in which to fetch the reviews.
* `sort` (optional, defaults to `sort.NEWEST`): The way the reviews are going to be sorted. Accepted values are: `sort.NEWEST`, `sort.RATING` and `sort.HELPFULNESS`.
* `num` (optional, defaults to 100): Quantity of reviews to be captured.

Example:

```javascript
var gplay = require('google-play-scraper');

gplay.reviews({
  appId: 'com.mojang.minecraftpe',
  sort: gplay.sort.RATING
}).then(console.log, console.log);
```

Results:

```javascript
[ { id: 'gp:AOqpTOFmAVORqfWGcaqfF39ftwFjGkjecjvjXnC3g_uL0NtVGlrrqm8X2XUWx0WydH3C9afZlPUizYVZAfARLuk',
    userName: 'Inga El-Ansary',
    userImage: 'https://lh3.googleusercontent.com/-hBGvzn3XlhQ/AAAAAAAAAAI/AAAAAAAAOw0/L4GY9KrQ-DU/w96-c-h96/photo.jpg',
    date: '2013-11-10T18:31:42.174Z',
    score: 5,
    scoreText: '5',
    url: 'https://play.google.com/store/apps/details?id=com.dxco.pandavszombies&reviewId=Z3A6QU9xcFRPRWZaVHVZZ081NlNsRW9TV0hJeklGSTBvYTBTUlFQUUJIZThBSGJDX2s1Y1o0ZXRCbUtLZmgzTE1PMUttRmpRSS1YcFgxRmx1ZXNtVzlVS0Zz'
    title: 'I LOVE IT',
    text: 'It has skins and snowballs everything I wanted its so cool I love it!!!!!!!!',
    replyDate: '2013-11-10T18:31:42.174Z',
    replyText: 'thanks for playing Panda vs Zombies!',
    version: '1.0.2',
    thumbsUp: 29,
    criterias: [
      {
        criteria: 'vaf_games_simple',
        rating: 1
      },
      {
        criteria: 'vaf_games_realistic',
        rating: 1
      },
      {
        criteria: 'vaf_games_complex',
        rating: 1
      }
    ] },
{   id: 'gp:AOqpTOF39mpW-6gurlkCCTV_8qnKne7O5wcFsLc6iGVot5hHpplqPCqIiVL2fjximXNujuMjwQ4pkizxGrn13x0',
    userName: 'Millie Hawthorne',
    userImage: 'https://lh5.googleusercontent.com/-Q_FTAEBH2Qg/AAAAAAAAAAI/AAAAAAAAAZk/W5dTdaHCUE4/w96-c-h96/photo.jpg',
    date: '2013-11-10T18:31:42.174Z',
    url: 'https://play.google.com/store/apps/details?id=com.dxco.pandavszombies&reviewId=Z3A6QU9xcFRPRmFHdlBFS2pGS2JVYW5Dd3kxTm1qUzRxQlYyc3Z4ZE9CYXRuc0hkclV3a09hbEFkOVdoWmw3eFN5VjF4cDJPLTg5TW5ZUjl1Zm9HOWc5NGtr',
    score: 5,
    scoreText: '5',
    title: 'CAN NEVER WAIT TILL NEW UPDATE',
    text: 'Love it but needs to pay more attention to pocket edition',
    replyDate: null,
    replyText: null,
    version: null,
    thumbsUp: 29
    criterias: [] } ]
```

## Memoization

Since every library call performs one or multiple requests to
an Google Play API or web page, sometimes it can be useful to cache the results
to avoid requesting the same data twice. The `memoized` function returns a
store object that caches its results:

```js
var store = require('google-play-scraper'); // regular non caching version
var memoized = require('google-play-scraper').memoized(); // cache with default options
var memoizedCustom = require('google-play-scraper').memoized({ maxAge: 1000 * 60 }); // cache with customized options

// first call will hit google play and cache the results
memoized.developer({devId: "DxCo Games"}).then(console.log);

// second call will return cached results
memoized.developer({devId: "DxCo Games"}).then(console.log);
```

The options available are those supported by the [memoizee](https://github.com/medikoo/memoizee) module.
By default up to 1000 values are cached by each method and they expire after 5 minutes.

## Throttling

All methods on the scraper have to access the Google Play server in one
form or another. When making too many requests in a short period of time
(specially when using the `fullDetail` option), is common to hit Google Play's
throttling limit. That means requests start getting status 503 responses with
a captcha to verify if the requesting entity is a human (which is not :P).
In those cases the requesting IP can be banned from making further requests for a
while (usually around an hour).

To avoid this situation, all methods now support a `throttle` property, which
defines an upper bound to the amount of requests that will be attempted per second.
Once that limit is reached, further requests will be held until the second passes.

```js
var gplay = require('google-play-scraper');

// the following method will perform batches of 10 requests per second
gplay.search({term: 'panda', throttle: 10}).then(console.log);
```

By default, no throttling is applied.
