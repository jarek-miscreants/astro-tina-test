import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "announcement",
        label: "Announcements",
        path: "src/content/announcements",
        format: "md",
        fields: [
          {
            type: "string",
            name: "href",
            label: "Link URL",
          },
          {
            type: "boolean",
            name: "dismissible",
            label: "Dismissible",
            required: true,
          },
          {
            type: "datetime",
            name: "startsAt",
            label: "Starts at",
            description: "Banner is hidden before this date.",
          },
          {
            type: "datetime",
            name: "endsAt",
            label: "Ends at",
            description: "Banner auto-hides after this date.",
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true,
          },
          {
            type: "number",
            name: "priority",
            label: "Priority",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          defaultItem: () => ({
            dismissible: true,
            enabled: true,
            priority: 0,
          }),
          filename: {
            slugify: (values) =>
              (values?.title || "announcement")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
          },
        },
      },
      {
        name: "faq",
        label: "FAQ",
        path: "src/content/faq",
        format: "md",
        fields: [
          {
            type: "string",
            name: "question",
            label: "Question",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "page",
            label: "Page",
            required: true,
            description: "Which page this FAQ entry appears on.",
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Answer",
            isBody: true,
          },
        ],
        ui: {
          defaultItem: () => ({
            page: "homepage",
            order: 1,
          }),
        },
      },
      {
        name: "component",
        label: "Components",
        path: "src/content/components",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "primitive", label: "Primitive" },
              { value: "block", label: "Block" },
              { value: "pattern", label: "Pattern" },
              { value: "layout", label: "Layout" },
              { value: "form", label: "Form" },
            ],
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            required: true,
          },
          {
            type: "string",
            name: "sourceFile",
            label: "Source file",
            required: true,
            description: "Path to the .astro source file.",
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            required: true,
            options: [
              { value: "stable", label: "Stable" },
              { value: "adaptable", label: "Adaptable" },
              { value: "per-project", label: "Per-project" },
            ],
          },
          {
            type: "string",
            name: "related",
            label: "Related components",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          defaultItem: () => ({
            category: "primitive",
            order: 100,
            status: "stable",
          }),
        },
      },
    ],
  },
});
