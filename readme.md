# @alexlafroscia/tldr-alfred-workflow

> Alfred workflow for TLDR docs

![Screenshot](./docs/screenshot.png)

## Install

```bash
npm install --global @alexlafroscia/tldr-alfred-workflow
```

*Requires [Node.js](https://nodejs.org) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

## Usage

In Alfred, type `tldr` followed by the name of a command you want to search for, such as `man`.

Continue typing to filter the results by the contents of the code example.

### More Features

- Pressing `CMD-C` on a result will copy the code example to the keyboard
- Pressing `CMD-L` on any of the results will show the full Markdown description of the command

## FAQ

### Q: Why aren't there tests run through CI?

Apparently Alfred needs to be installed in the testing environment; I couldn't get it to work right in Travis CI. If you can help me with this, please let me know.

### Q: I'm getting an error about rate limiting? What's going on?

I noticed during development that after hitting their API repeatedly, Github started sending `403` responses. If you wait a bit, you should be able to make requests again.

## License

MIT © [Alex LaFroscia](https://github.com/alexlafroscia)
