import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },

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
        }),
      },
    }),
  },
});
