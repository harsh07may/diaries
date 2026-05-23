import { collection, config, fields, singleton } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: { owner: "harsh07may", name: "diaries" },
        }
      : { kind: "local" },

  singletons: {
    character: singleton({
      label: "About Me",
      path: "content/hero/character",
      schema: {
        name: fields.text({ label: "Name" }),
        bio: fields.text({ label: "Bio", multiline: true }),
      },
    }),

    whereILive: singleton({
      label: "Where I Live",
      path: "content/hero/where-i-live/",
      schema: {
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Scenery Image",
          directory: "public/hero",
          publicPath: "/hero/",
        }),
      },
    }),

    placesToGo: singleton({
      label: "Places to Go",
      path: "content/hero/places-to-go",
      schema: {
        places: fields.array(
          fields.object({
            name: fields.text({ label: "Place Name" }),
            visited: fields.checkbox({ label: "Visited", defaultValue: false }),
          }),
          {
            label: "Places",
            itemLabel: (props) => props.fields.name.value ?? "Place",
          }
        ),
      },
    }),

    brainDump: singleton({
      label: "Brain Dump",
      path: "content/hero/brain-dump",
      schema: {
        items: fields.array(
          fields.object({
            text: fields.text({ label: "Note" }),
          }),
          {
            label: "Notes",
            itemLabel: (props) => props.fields.text.value ?? "Note",
          }
        ),
      },
    }),

    books: singleton({
      label: "Books",
      path: "content/hero/books",
      schema: {
        books: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            author: fields.text({ label: "Author" }),
            color: fields.select({
              label: "Card Color",
              options: [
                { label: "Yellow", value: "yellow" },
                { label: "Pink", value: "pink" },
                { label: "Green", value: "green" },
                { label: "Blue", value: "blue" },
              ],
              defaultValue: "yellow",
            }),
          }),
          {
            label: "Books",
            itemLabel: (props) => props.fields.title.value ?? "Book",
          }
        ),
      },
    }),

    contacts: singleton({
      label: "Contacts",
      path: "content/hero/contacts",
      schema: {
        contacts: fields.array(
          fields.object({
            icon: fields.text({
              label: "Icon Glyph",
              description: 'Short text shown in the icon circle, e.g. "𝕏", "Ig", "In", "@"',
            }),
            handle: fields.text({
              label: "Display Handle",
              description: 'Shown next to the icon, e.g. "@kanaka_pages"',
            }),
            url: fields.text({ label: "URL" }),
            bgColor: fields.select({
              label: "Icon Background",
              options: [
                { label: "Black", value: "black" },
                { label: "Pink", value: "pink" },
                { label: "Blue", value: "blue" },
                { label: "Yellow", value: "yellow" },
              ],
              defaultValue: "black",
            }),
          }),
          {
            label: "Contacts",
            itemLabel: (props) => props.fields.handle.value ?? "Contact",
          }
        ),
      },
    }),
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
        image: fields.image({
          label: "Cover Image",
          directory: "public/images",
          publicPath: "/images/",
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
