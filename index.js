'use strict';

const alfy = require('alfy');
const { parse } = require('tldr/lib/parser');

const CACHE_AGE = 5 * 1000 * 60; // 5 minutes
const IS_TESTING = process.env.NODE_ENV === 'test';

// Alfy will call the script directly, so we can detect that to either export
// the function or run it right away
if (require.main === module) {
  main(alfy.input, {
    username: process.env['username'],
    password: process.env['password']
  }).then(alfy.output);
}

function allSettled(promises) {
  const wrappedPromises = promises.map(p =>
    Promise.resolve(p).then(
      val => ({ state: 'fulfilled', value: val }),
      err => ({ state: 'rejected', reason: err })
    )
  );

  return Promise.all(wrappedPromises);
}

/**
 * Hit the Github API to fetch results for the query
 *
 * @param {string} url
 * @param {object} options
 * @return {Promise} filtered results
 */
function fetchResults(url, options) {
  return alfy.fetch(url, options).then(payload => {
    const { content, encoding } = payload;
    const markdown = Buffer.from(content, encoding).toString('ascii');
    const { name, examples } = parse(markdown);

    return examples.map(example => ({
      title: example.code,
      subtitle: example.description,
      quicklookurl: `https://tldr.ostera.io/${name}`,
      text: {
        copy: example.code,
        largetype: markdown
      }
    }));
  });
}

/**
 * Make the URL for the Github API based on the type of docs to search and the command
 *
 * @param {string} type the docset to search
 * @param {string} command the command to search for
 * @return {string} the API URL
 */
function buildURL(type, command) {
  return `https://api.github.com/repos/tldr-pages/tldr/contents/pages/${type}/${command}.md?ref=master`;
}

function main(input, { username, password } = {}) {
  const tokens = input.split(' ');
  const [command, ...search] = tokens;
  const searchCommand = search.join(' ');

  const hasAuthentication = username && password;
  const options = {
    maxAge: IS_TESTING ? undefined : CACHE_AGE,
    auth: hasAuthentication ? `${username}:${password}` : undefined
  };

  return allSettled([
    fetchResults(buildURL('common', command), options),
    fetchResults(buildURL('osx', command), options)
  ]).then(results => {
    const successfulResults = results
      .filter(result => result.state === 'fulfilled')
      .map(result => result.value);

    if (successfulResults.length > 0) {
      return successfulResults
        .reduce((acc, results) => [...acc, ...results], [])
        .filter(result => result.title.includes(searchCommand));
    }

    const errors = results
      .filter(result => result.state === 'rejected')
      .map(result => result.reason);
    const [error] = errors;

    if (error.statusCode === 403) {
      return [
        {
          title:
            "You're probably over your rate limit. Slow down and try again later"
        }
      ];
    } else if (error.statusCode === 404) {
      return [
        {
          title: 'Command not found'
        }
      ];
    } else {
      throw error;
    }
  });
}

module.exports = main;
