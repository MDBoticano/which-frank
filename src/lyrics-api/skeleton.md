# Using the API

## Step 1: Search for artists named Frank
#### query
[artist.search](https://developer.musixmatch.com/documentation/api-reference/artist-search)

#### return
```
"body": {
  artist_list: [
    {
      "artist": {
        "artist_id" : 0000000,
        ...
        "artist_name": "Frank",
      },
      ...
    }
  ]
}
```

#### example: Get 5 artists matching the name 'prodigy'
`artist.search?q_artist=prodigy&page_size=5`


## Step 2: Get the top x-number of tracks for each artist
#### query
[track.search](https://developer.musixmatch.com/documentation/api-reference/track-search)

#### return
```
"body": {
  "track_list": [
    {
      "track": "track'"
    },
    {
      "track": "track'"
    },
    {
      "track": "track'"
    }
  ]
}
```

#### example: Get Justin Bieber's top 3 tracks, sorted by rating
`http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc`

## Step 3: Search each track for a snippet
#### query
[track.snippet.get](https://developer.musixmatch.com/documentation/api-reference/track-snippet-get)

#### return
```
"body": {
  "snippet": {
    "snippet_language": "en",
    "restricted": 0,
    "instrumental": 0,
    "snippet_body": "You shoot me down, but I won't fall",
    ...
  }
}
```

note: There's a field to indicate if the lyric is restricted, which I'm guessing refers to explicit or not. 

#### example: Get the snippet for Titanium from David Guetta
`track.snippet.get?track_id=16860631`

## Step 4: Use the collected data and convert it into a form that <App /> can use
??? - this might involve restructuring the form of allLyrics to more efficiently package lyrics