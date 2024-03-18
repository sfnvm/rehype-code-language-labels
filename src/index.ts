import { visit } from "unist-util-visit";
import type * as H from "hast";
import type { BuildVisitor, VisitorResult } from "unist-util-visit";

type Options = {
  customTagName?: string;
  customClassName?: string;
  titleSeparator?: string;
  fallbackLanguage?: string;
};

function rehypeCodeLanguageLabels(
  {
    customTagName = "small",
    customClassName = "rehype-code-language-label",
    fallbackLanguage = "",
  }: Options = {
    customTagName: "small",
    customClassName: "rehype-code-language-label",
    fallbackLanguage: "",
  }
) {
  return function transformer(tree: H.Root) {
    const visitor: BuildVisitor<H.Root, "element"> = (
      node,
      index,
      parent
    ): VisitorResult => {
      if (!parent || node.tagName !== "code") {
        return;
      }

      const classNames =
        (node?.properties?.className as Array<string>) ?? ([] as Array<string>);
      const languageClass = classNames?.find((cn) =>
        cn.startsWith("language-")
      );

      if (!languageClass) return;

      const targetLanguage = languageClass
        ? languageClass.slice(9)
        : fallbackLanguage;

      parent.children.splice(index!, 0, {
        type: "element",
        tagName: customTagName,
        children: [{ type: "text", value: targetLanguage }],
        properties: { className: [customClassName] },
      });

      return index! + 2;
    };

    visit(tree, "element", visitor);
  };
}

export default rehypeCodeLanguageLabels;
