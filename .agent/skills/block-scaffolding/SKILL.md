---
name: wp-block-scaffolding
description: Use this skill when generating, modifying, or scaffolding the core React files and file structures for the Pricing Table and Pricing Column blocks.
context: fork
---

# Objective

Scaffold and maintain a highly scalable, nested parent-child block relationship using native WordPress `<InnerBlocks />` architecture. The framework establishes a structural parent (`clh/pricing-table`) that explicitly manages and limits its immediate children (`clh/pricing-column`).

---

## 1. Directory & File Structure

All block file layouts must conform strictly to the standard multi-block scaffolding blueprint under `blocks/src` and compile to `blocks/build`:

```text
blocks/src
├── pricing-table/              # Structural Parent Block
│   ├── block.json              # Defines parent category, keywords, allowedBlocks, render file
│   ├── index.js                # Core JS client registration (imports './style.scss')
│   ├── edit.js                 # Holds <InnerBlocks> with design templates (imports './editor.scss')
│   ├── render.php              # Server-side dynamic HTML template wrapper
│   ├── style.scss              # Frontend + editor shared styling
│   └── editor.scss             # Editor-only interface visual accents
│
└── pricing-column/             # Functional Child Block
    ├── block.json              # Defines parent constraint, layout attributes
    ├── index.js                # Core JS client registration (imports './style.scss')
    ├── edit.js                 # RichText inputs for pricing details, buttons (imports './editor.scss')
    ├── render.php              # Server-side dynamic HTML template wrapper
    ├── style.scss              # Frontend + editor shared styling
    └── editor.scss             # Editor-only interface visual accents
```

### Stylesheet Import Standard
To maintain clean modular boundaries and prevent layout leakage:
- **`style.scss`** must be imported at the top of the block's main **`index.js`** file.
- **`editor.scss`** must be imported at the top of the block's **`edit.js`** component file.
