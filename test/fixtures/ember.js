const payload = {
  name: "ember.md",
  path: "pages/common/ember.md",
  sha: "8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb",
  size: 519,
  url:
    "https://api.github.com/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master",
  html_url:
    "https://github.com/tldr-pages/tldr/blob/master/pages/common/ember.md",
  git_url:
    "https://api.github.com/repos/tldr-pages/tldr/git/blobs/8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb",
  download_url:
    "https://raw.githubusercontent.com/tldr-pages/tldr/master/pages/common/ember.md",
  type: "file",
  content:
    "IyBlbWJlcgoKPiBUaGUgRW1iZXIuanMgY29tbWFuZCBsaW5lIHV0aWxpdHku\nCj4gVXNlZCBmb3IgY3JlYXRpbmcgYW5kIG1haW50YWluaW5nIEVtYmVyLmpz\nIGFwcGxpY2F0aW9ucy4KCi0gQ3JlYXRlIGEgbmV3IEVtYmVyIGFwcGxpY2F0\naW9uOgoKYGVtYmVyIG5ldyB7e215X25ld19hcHB9fWAKCi0gQ3JlYXRlIGEg\nbmV3IEVtYmVyIGFkZG9uOgoKYGVtYmVyIGFkZG9uIHt7bXlfbmV3X2FkZG9u\nfX1gCgotIEJ1aWxkIHRoZSBwcm9qZWN0OgoKYGVtYmVyIGJ1aWxkYAoKLSBS\ndW4gdGhlIGRldmVsb3BtZW50IHNlcnZlcjoKCmBlbWJlciBzZXJ2ZWAKCi0g\nUnVuIHRoZSB0ZXN0IHN1aXRlOgoKYGVtYmVyIHRlc3RgCgotIFJ1biBhIGJs\ndWVwcmludCB0byBnZW5lcmF0ZSBzb21ldGhpbmcgbGlrZSBhIHJvdXRlIG9y\nIGNvbXBvbmVudDoKCmBlbWJlciBnZW5lcmF0ZSB7e3R5cGV9fSB7e25hbWV9\nfWAKCi0gSW5zdGFsbCBhbiBlbWJlci1jbGkgYWRkb246CgpgZW1iZXIgaW5z\ndGFsbCB7e25hbWVfb2ZfYWRkb259fWAK\n",
  encoding: "base64",
  _links: {
    self:
      "https://api.github.com/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master",
    git:
      "https://api.github.com/repos/tldr-pages/tldr/git/blobs/8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb",
    html:
      "https://github.com/tldr-pages/tldr/blob/master/pages/common/ember.md",
  },
};

const largetype =
  "# ember\n\n> The Ember.js command line utility.\n> Used for creating and maintaining Ember.js applications.\n\n- Create a new Ember application:\n\n`ember new {{my_new_app}}`\n\n- Create a new Ember addon:\n\n`ember addon {{my_new_addon}}`\n\n- Build the project:\n\n`ember build`\n\n- Run the development server:\n\n`ember serve`\n\n- Run the test suite:\n\n`ember test`\n\n- Run a blueprint to generate something like a route or component:\n\n`ember generate {{type}} {{name}}`\n\n- Install an ember-cli addon:\n\n`ember install {{name_of_addon}}`\n";
const quicklookurl = "https://tldr.ostera.io/ember";

module.exports = {
  payload,
  largetype,
  quicklookurl,
};
