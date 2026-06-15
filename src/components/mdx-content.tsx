import Link from "next/link";

function renderInline(text: string) {
  const link = text.match(/^\[(.+)]\((.+)\)$/);
  if (link) {
    const href = link[2];
    if (href.startsWith("/")) {
      return <Link href={href}>{link[1]}</Link>;
    }
    return (
      <a href={href} rel="noreferrer" target="_blank">
        {link[1]}
      </a>
    );
  }
  return text;
}

function parseBlocks(source: string) {
  const lines = source.trim().split("\n");
  const blocks: { type: "h2" | "h3" | "p" | "ul"; content: string | string[] }[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", content: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", content: list });
      list = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", content: trimmed.replace(/^## /, "") });
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", content: trimmed.replace(/^### /, "") });
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.replace(/^- /, ""));
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function MdxContent({ source }: { source: string }) {
  const blocks = parseBlocks(source);

  return (
    <div className="prose-content">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.content}</h2>;
        if (block.type === "h3") return <h3 key={index}>{block.content}</h3>;
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {(block.content as string[]).map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{renderInline(block.content as string)}</p>;
      })}
    </div>
  );
}
