module.exports = {
  "semverRange": "^",
  "sortFirst": ["name", "description", "version", "type", "private", "main", "module", "exports", "types", "license", "repository", "author", "keywords", "scripts", "dependencies", "devDependencies", "peerDependencies", "resolutions"],
  "sortAz": [],
  "semverGroups": [{
    "range": "",
    "dependencyTypes": ["prod", "dev", "resolutions", "overrides"],
    "dependencies": ["**"],
    "packages": ["**"]
  }],
}
