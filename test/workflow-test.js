const test = require("ava");
const nock = require("nock");

const run = require("../");
const { payload, largetype, quicklookurl } = require("./fixtures/ember");

test.beforeEach(() => {
  nock.disableNetConnect();
});

test.afterEach(() => {
  nock.enableNetConnect();
});

test("it can fetch all of the examples for a command", async (t) => {
  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(200, payload)
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(404);

  const result = await run("ember");

  t.deepEqual(result, [
    {
      title: "ember new {{my_new_app}}",
      subtitle: "Create a new Ember application:",
      quicklookurl,
      text: {
        copy: "ember new {{my_new_app}}",
        largetype,
      },
    },
    {
      title: "ember addon {{my_new_addon}}",
      subtitle: "Create a new Ember addon:",
      quicklookurl,
      text: {
        copy: "ember addon {{my_new_addon}}",
        largetype,
      },
    },
    {
      title: "ember build",
      subtitle: "Build the project:",
      quicklookurl,
      text: {
        copy: "ember build",
        largetype,
      },
    },
    {
      title: "ember serve",
      subtitle: "Run the development server:",
      quicklookurl,
      text: {
        copy: "ember serve",
        largetype,
      },
    },
    {
      title: "ember test",
      subtitle: "Run the test suite:",
      quicklookurl,
      text: {
        copy: "ember test",
        largetype,
      },
    },
    {
      title: "ember generate {{type}} {{name}}",
      subtitle:
        "Run a blueprint to generate something like a route or component:",
      quicklookurl,
      text: {
        copy: "ember generate {{type}} {{name}}",
        largetype,
      },
    },
    {
      title: "ember install {{name_of_addon}}",
      subtitle: "Install an ember-cli addon:",
      quicklookurl,
      text: {
        copy: "ember install {{name_of_addon}}",
        largetype,
      },
    },
  ]);
});

test("it can filter the examples for a command", async (t) => {
  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(200, payload)
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(404);

  const result = await run("ember new");

  t.deepEqual(result, [
    {
      title: "ember new {{my_new_app}}",
      subtitle: "Create a new Ember application:",
      quicklookurl,
      text: {
        copy: "ember new {{my_new_app}}",
        largetype,
      },
    },
    {
      title: "ember addon {{my_new_addon}}",
      subtitle: "Create a new Ember addon:",
      quicklookurl,
      text: {
        copy: "ember addon {{my_new_addon}}",
        largetype,
      },
    },
  ]);
});

test("it can send credentials to the Github server", async (t) => {
  t.plan(2);

  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(200, function () {
      let authorizationHeader = this.req.headers.authorization.split(" ")[1];
      authorizationHeader = new Buffer(authorizationHeader, "base64").toString(
        "ascii"
      );

      const [username, password] = authorizationHeader.split(":");

      t.is(username, "foo");
      t.is(password, "bar");

      return payload;
    })
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(404);

  await run("ember", {
    username: "foo",
    password: "bar",
  });
});

test("it can get results from the OSX set of commands", async (t) => {
  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(404)
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(200, payload);

  const result = await run("ember");

  t.deepEqual(result, [
    {
      title: "ember new {{my_new_app}}",
      subtitle: "Create a new Ember application:",
      quicklookurl,
      text: {
        copy: "ember new {{my_new_app}}",
        largetype,
      },
    },
    {
      title: "ember addon {{my_new_addon}}",
      subtitle: "Create a new Ember addon:",
      quicklookurl,
      text: {
        copy: "ember addon {{my_new_addon}}",
        largetype,
      },
    },
    {
      title: "ember build",
      subtitle: "Build the project:",
      quicklookurl,
      text: {
        copy: "ember build",
        largetype,
      },
    },
    {
      title: "ember serve",
      subtitle: "Run the development server:",
      quicklookurl,
      text: {
        copy: "ember serve",
        largetype,
      },
    },
    {
      title: "ember test",
      subtitle: "Run the test suite:",
      quicklookurl,
      text: {
        copy: "ember test",
        largetype,
      },
    },
    {
      title: "ember generate {{type}} {{name}}",
      subtitle:
        "Run a blueprint to generate something like a route or component:",
      quicklookurl,
      text: {
        copy: "ember generate {{type}} {{name}}",
        largetype,
      },
    },
    {
      title: "ember install {{name_of_addon}}",
      subtitle: "Install an ember-cli addon:",
      quicklookurl,
      text: {
        copy: "ember install {{name_of_addon}}",
        largetype,
      },
    },
  ]);
});

test("it can show results from both the common and OSX set", async (t) => {
  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(200, payload)
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(200, payload);

  const result = await run("ember");

  t.is(result.length, 14);
});

test("it shows a message when there is no matching command", async (t) => {
  nock("https://api.github.com")
    .get("/repos/tldr-pages/tldr/contents/pages/osx/ember.md?ref=master")
    .reply(404)
    .get("/repos/tldr-pages/tldr/contents/pages/common/ember.md?ref=master")
    .reply(404);

  const result = await run("ember");

  t.deepEqual(result, [
    {
      title: "Command not found",
    },
  ]);
});
