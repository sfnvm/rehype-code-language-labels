# rehype-code-language-labels

Rehype plugin that create element before code section when parsing Markdown code blocks.

## Installation

```shell
npm install rehype-code-language-labels
```

## API

This package exports no identifiers. The default export is `rehypeCodeLanguageLabels`

### `rehype().use(rehypeCodeLanguageLabels[, options])`

---

#### `options`

##### `options.customClassName`

Specify your own custom css class name to apply. Defaults to `rehype-code-language-label`.
<br/>
Note: you will have to write the CSS implementation yourself.

**For example**

```css
section {
  position: relative;
}

.rehype-code-language-label {
  font-weight: 600;
  font-size: 0.65rem;
  position: absolute;
  text-transform: uppercase;
  right: 0px;
  user-select: none;
  border-bottom-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
```

##### `options.fallbackLanguage`

Fallback language.

// default behavior will be

````
```bash
// language will be 'bash'
```
````

````
```
// Nothing will generate
```
````

### Input & Output

---

> Input with language

````md
## Code Example

```bash
// code here
```
````

> Output

```html
<pre>
  <small class="rehype-code-language-label">bash</small>
  <code class="language-bash">
    <!-- HTML parse code here -->
  </code>
</pre>
```

---

> Input without any language

````md
## Code Example

```
// text here
```
````

> Output

```html
<pre>
  <code class="">
    <!-- HTML parse text here -->
  </code>
</pre>
```

## Usage

Use this as a [Rehype Plugin](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#using-plugins).

```typescript
import rehype from "rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeLanguageLabels from "rehype-code-language-labels";

rehype()
  .use(rehypeHighlight)
  // should always be after rehypeHighlight.
  .use(rehypeCodeLanguageLabels)
  // In case you still want to display 'something' as default value
  // .use(rehypeCodeLanguageLabels, {fallbackLanguage: "UNKNOWN"})
  .use(rehypeStringify)
  .process(/* markdown */);
```

## License

[MIT](https://github.com/rockchalkwushock/rehype-code-titles/blob/master/LICENSE)

## Ref

- [How to make your own NPM package (Step-by-Step) 📦](https://www.youtube.com/watch?v=xnfdm-s8adI)
