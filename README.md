Running on Middleman 3

## Run Locally
Start locally
`middleman server`
(`http://localhost:4567/`)


## Deploy to Github pages
via Middleman GH pages
```
rake build    # Compile all files into the build directory
rake publish  # Build and publish to Github Pages
```
To publish uncommitted changes:n
```
bundle exec rake publish ALLOW_DIRTY=true
```
