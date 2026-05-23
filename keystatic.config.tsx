import { collection, config, fields } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: { owner: "harsh07may", name: "diaries" },
        }
      : { kind: "local" },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        id: fields.ignored(),
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        color: fields.select({
          label: "Card Color",
          description: "Controls the highlight color on the blog index card.",
          options: [
            { label: "Yellow", value: "yellow" },
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
          ],
          defaultValue: "yellow",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value ?? "Tag",
        }),
        image: fields.text({
          label: "Cover Image Path",
          description: "Relative path to image in /public, e.g. /images/post-1.jpg",
        }),
        author: fields.text({ label: "Author Name" }),
        authorRole: fields.text({ label: "Author Role" }),
        authorBio: fields.text({ label: "Author Bio", multiline: true }),
        authorImage: fields.text({
          label: "Author Image Path",
          description: "Optional. Leave blank if not needed.",
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            link: true,
            image: true,
            divider: true,
            codeBlock: true,
          },
          components: {
            Callout: wrapper({
              label: "Callout",
              schema: {
                variant: fields.select({
                  label: "Variant",
                  options: [
                    { label: "Note", value: "note" },
                    { label: "Tip", value: "tip" },
                    { label: "Warning", value: "warning" },
                    { label: "Caution", value: "caution" },
                  ],
                  defaultValue: "note",
                }),
              },
            }),
            ImageGrid: wrapper({
              label: "Image Grid",
              schema: {
                src: fields.text({
                  label: "Image Path",
                  description: "e.g. /images/example.jpg",
                }),
                alt: fields.text({ label: "Alt Text" }),
                title: fields.text({ label: "Title (optional)" }),
              },
            }),
          },
        }),
      },
    }),
  },
});
