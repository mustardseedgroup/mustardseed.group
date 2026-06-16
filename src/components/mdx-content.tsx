import Link from "next/link";
import Image from "next/image";

type Block =
  | { type: "h2" | "h3" | "p"; content: string }
  | { type: "ul"; content: string[] }
  | { type: "image"; alt: string; src: string; caption?: string }
  | { type: "youtube"; title: string; src: string };

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

function toYouTubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }
  return "";
}

function parseBlocks(source: string) {
  const lines = source.trim().split("\n");
  const blocks: Block[] = [];
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
    const image = trimmed.match(/^!\[(.*)]\((\S+?)(?:\s+"(.+)")?\)$/);
    if (image) {
      flushParagraph();
      flushList();
      blocks.push({ type: "image", alt: image[1], src: image[2], caption: image[3] });
      continue;
    }
    const youtube = trimmed.match(/^::youtube\[(.+)]\((.+)\)$/);
    if (youtube) {
      flushParagraph();
      flushList();
      const src = toYouTubeEmbed(youtube[2]);
      if (src) blocks.push({ type: "youtube", title: youtube[1], src });
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
        if (block.type === "image") {
          return (
            <figure key={index} className="prose-figure">
              <Image src={block.src} alt={block.alt} width={1600} height={900} sizes="(min-width: 1024px) 960px, 100vw" />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }
        if (block.type === "youtube") {
          return (
            <figure key={index} className="prose-video">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={block.src}
                title={block.title}
              />
              <figcaption>{block.title}</figcaption>
            </figure>
          );
        }
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
