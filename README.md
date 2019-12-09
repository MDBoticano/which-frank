# [Which Frank?](https://mdboticano.github.io/which-frank)
How well do you know musicians named Frank? Find out with this guessing game made with React.

## Work in Progress
### 3.0.0
This will move the app hosting from GitHub pages to Netlify. Moving the app to Netlify enables "hiding" the API key in environment variables. As the app makes the requests to the API itself, the user will still be able to see the post-fixed API key.

#### Issues to fix/Goals
- [ ] Remove `<APIKeyForm />` due to key now being in env variables
- [ ] Simplify flow and routing with react-router (compatible with Netlify, not with GH Pages)
- [ ] Decrease snippet retreival speed (create a benchmark?)
- [ ] Improve track search to remove remixes/remasters of the same songs
- [ ] Improve UI
- [ ] Incorporate testing in development


## Releases
### 2.0.1
- Changed CORS proxy to use live example of CORS-Anywhere.
- Fixed bug that kept the play disabled if the user entered an invalid API key. 

### 2.0.0
- Added ability to fetch lyrics from Musixmatch API. For now, the API key is accepted from within the UI. 

### 1.1.0
- After guessing the last lyric, the score is shown (no more 'View Score' prompt).
