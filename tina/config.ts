import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId:
    process.env.TINA_PUBLIC_CLIENT_ID ||
    "a644f379-2762-4268-8751-b211903a5314",
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
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "object",
            name: "blocks",
            label: "Blocks",
            list: true,
            ui: {
              itemProps: (item: { _template?: string }) => ({
                label: item?._template ?? "block",
              }),
            },
            templates: [
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "object",
                    name: "ctaPrimary",
                    label: "Primary CTA",
                    fields: [
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "href", label: "Link URL" },
                    ],
                  },
                  {
                    type: "object",
                    name: "ctaSecondary",
                    label: "Secondary CTA",
                    fields: [
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "href", label: "Link URL" },
                    ],
                  },
                ],
              },
              {
                name: "features",
                label: "Features grid",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "object",
                    name: "items",
                    label: "Cards",
                    list: true,
                    ui: {
                      itemProps: (item: { title?: string }) => ({
                        label: item?.title ?? "Card",
                      }),
                    },
                    fields: [
                      { type: "string", name: "eyebrow", label: "Eyebrow" },
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon (lucide:name)",
                      },
                      { type: "image", name: "image", label: "Image" },
                    ],
                  },
                ],
              },
              {
                name: "iconStats",
                label: "Icon stats row",
                fields: [
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    ui: {
                      itemProps: (item: { header?: string }) => ({
                        label: item?.header ?? "Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon (lucide:name)",
                      },
                      { type: "string", name: "header", label: "Header" },
                      {
                        type: "string",
                        name: "content",
                        label: "Content",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "accordionMorph",
                label: "Accordion (morphing)",
                fields: [
                  { type: "string", name: "ariaLabel", label: "Aria label" },
                  {
                    type: "number",
                    name: "openIndex",
                    label: "Default open index",
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Items",
                    list: true,
                    ui: {
                      itemProps: (item: { title?: string }) => ({
                        label: item?.title ?? "Item",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon (lucide:name)",
                      },
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "flowSteps",
                label: "Flow steps",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "steps",
                    label: "Steps",
                    list: true,
                    ui: {
                      itemProps: (item: { title?: string }) => ({
                        label: item?.title ?? "Step",
                      }),
                    },
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
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
