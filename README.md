# [Which Frank?](https://nervous-northcutt-5b1f9b.netlify.com/)
Which Frank does the lyric belong to? Guess who!

This React app retrieves lyrics from artists' trending tracks via the [Musixmatch API](https://developer.musixmatch.com/documentation).

## Instructions
Just want to just play? The app is on [Netlify](https://nervous-northcutt-5b1f9b.netlify.com/).

Otherwise, clone and navigate to the project repository. Then...
### `npm install`
### `npm start`

The app should then be available at [http://localhost:3000](http://localhost:3000)

## Work in Progress

### Issues to fix
- [ ] Decrease snippet retreival speed (create a benchmark?)
- [ ] Improve track search to remove remixes/remasters of the same songs
- [ ] Improve UI some more (responsiveness, accessibility, styling)

### Goals/Features
- [ ] Allow users to create their own artist pairings from within the app
- [ ] Allow users to change the number of tracks retrieved per artist

## Releases
### 3.0.0
- Refactored to use env variables to retrieve API key (Netlify hosted)
- Added basic styling

#### Tasks completed
- [X] Remove API form due to key now being in env variables
- [X] Simplify flow and routing with react-router (compatible with Netlify, not with GH Pages)
- [X] Improve UI

### 2.0.1
- Changed CORS proxy to use live example of CORS-Anywhere.
- Fixed bug that kept the play disabled if the user entered an invalid API key. 

### 2.0.0
- Added ability to fetch lyrics from Musixmatch API. For now, the API key is accepted from within the UI. 

### 1.1.0
- After guessing the last lyric, the score is shown (no more 'View Score' prompt).
