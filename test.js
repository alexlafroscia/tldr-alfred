import test from 'ava';
import run from './';
import nock from 'nock';

const PAYLOAD = {
  name: 'ember.md',
  path: 'pages/common/ember.md',
  sha: '8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb',
  size: 519,
  url:
    'https://api.github.com/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master',
  html_url:
    'https://github.com/tldr-pages/tldr/blob/master/pages/common/ember.md',
  git_url:
    'https://api.github.com/repos/tldr-pages/tldr/git/blobs/8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb',
  download_url:
    'https://raw.githubusercontent.com/tldr-pages/tldr/master/pages/common/ember.md',
  type: 'file',
  content:
    'IyBlbWJlcgoKPiBUaGUgRW1iZXIuanMgY29tbWFuZCBsaW5lIHV0aWxpdHku\nCj4gVXNlZCBmb3IgY3JlYXRpbmcgYW5kIG1haW50YWluaW5nIEVtYmVyLmpz\nIGFwcGxpY2F0aW9ucy4KCi0gQ3JlYXRlIGEgbmV3IEVtYmVyIGFwcGxpY2F0\naW9uOgoKYGVtYmVyIG5ldyB7e215X25ld19hcHB9fWAKCi0gQ3JlYXRlIGEg\nbmV3IEVtYmVyIGFkZG9uOgoKYGVtYmVyIGFkZG9uIHt7bXlfbmV3X2FkZG9u\nfX1gCgotIEJ1aWxkIHRoZSBwcm9qZWN0OgoKYGVtYmVyIGJ1aWxkYAoKLSBS\ndW4gdGhlIGRldmVsb3BtZW50IHNlcnZlcjoKCmBlbWJlciBzZXJ2ZWAKCi0g\nUnVuIHRoZSB0ZXN0IHN1aXRlOgoKYGVtYmVyIHRlc3RgCgotIFJ1biBhIGJs\ndWVwcmludCB0byBnZW5lcmF0ZSBzb21ldGhpbmcgbGlrZSBhIHJvdXRlIG9y\nIGNvbXBvbmVudDoKCmBlbWJlciBnZW5lcmF0ZSB7e3R5cGV9fSB7e25hbWV9\nfWAKCi0gSW5zdGFsbCBhbiBlbWJlci1jbGkgYWRkb246CgpgZW1iZXIgaW5z\ndGFsbCB7e25hbWVfb2ZfYWRkb259fWAK\n',
  encoding: 'base64',
  _links: {
    self:
      'https://api.github.com/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master',
    git:
      'https://api.github.com/repos/tldr-pages/tldr/git/blobs/8678ea0d2693ceb08abcf5f3a6d17db5eddd71bb',
    html: 'https://github.com/tldr-pages/tldr/blob/master/pages/common/ember.md'
  }
};
const largetype =
  '# ember\n\n> The Ember.js command line utility.\n> Used for creating and maintaining Ember.js applications.\n\n- Create a new Ember application:\n\n`ember new {{my_new_app}}`\n\n- Create a new Ember addon:\n\n`ember addon {{my_new_addon}}`\n\n- Build the project:\n\n`ember build`\n\n- Run the development server:\n\n`ember serve`\n\n- Run the test suite:\n\n`ember test`\n\n- Run a blueprint to generate something like a route or component:\n\n`ember generate {{type}} {{name}}`\n\n- Install an ember-cli addon:\n\n`ember install {{name_of_addon}}`\n';
const quicklookurl = 'https://tldr.ostera.io/ember';

test.beforeEach(() => {
  nock.disableNetConnect();

  nock('https://api.github.com')
    .get('/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master')
    .reply(200, PAYLOAD);
});

test.afterEach(() => {
  nock.enableNetConnect();
});

test('it can fetch all of the examples for a command', async t => {
  const result = await run('ember');

  t.deepEqual(result, [
    {
      title: 'ember new {{my_new_app}}',
      subtitle: 'Create a new Ember application:',
      quicklookurl,
      text: {
        copy: 'ember new {{my_new_app}}',
        largetype
      }
    },
    {
      title: 'ember addon {{my_new_addon}}',
      subtitle: 'Create a new Ember addon:',
      quicklookurl,
      text: {
        copy: 'ember addon {{my_new_addon}}',
        largetype
      }
    },
    {
      title: 'ember build',
      subtitle: 'Build the project:',
      quicklookurl,
      text: {
        copy: 'ember build',
        largetype
      }
    },
    {
      title: 'ember serve',
      subtitle: 'Run the development server:',
      quicklookurl,
      text: {
        copy: 'ember serve',
        largetype
      }
    },
    {
      title: 'ember test',
      subtitle: 'Run the test suite:',
      quicklookurl,
      text: {
        copy: 'ember test',
        largetype
      }
    },
    {
      title: 'ember generate {{type}} {{name}}',
      subtitle:
        'Run a blueprint to generate something like a route or component:',
      quicklookurl,
      text: {
        copy: 'ember generate {{type}} {{name}}',
        largetype
      }
    },
    {
      title: 'ember install {{name_of_addon}}',
      subtitle: 'Install an ember-cli addon:',
      quicklookurl,
      text: {
        copy: 'ember install {{name_of_addon}}',
        largetype
      }
    }
  ]);
});

test('it can filter the examples for a command', async t => {
  const result = await run('ember new');

  t.deepEqual(result, [
    {
      title: 'ember new {{my_new_app}}',
      subtitle: 'Create a new Ember application:',
      quicklookurl,
      text: {
        copy: 'ember new {{my_new_app}}',
        largetype
      }
    },
    {
      title: 'ember addon {{my_new_addon}}',
      subtitle: 'Create a new Ember addon:',
      quicklookurl,
      text: {
        copy: 'ember addon {{my_new_addon}}',
        largetype
      }
    }
  ]);
});
