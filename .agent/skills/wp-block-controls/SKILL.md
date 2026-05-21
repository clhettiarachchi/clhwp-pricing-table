---
name: wp-block-controls
description: Use this skill when designing, adding, or modifying block settings, toolbars, sidebars, or inspector controls for the Pricing Table and Pricing Column blocks.
context: stack
---

# Objective

Enforce a clean, native, and unified block configuration interface within the WordPress editor sidebar (`<InspectorControls>`) and block toolbars (`<BlockControls>`). This skill ensures consistent data binding between React UI controls and the block's attributes configuration.

---

## 1. Unified Control Layout Map

### Parent Controls (`pricing-table`)

The parent block manages macro-level layouts that affect the entire table structure.

- **Settings Group 1 (Layout Settings):** Column count limits, layout orientation.
- **Settings Group 2 (Global Style Sync):** Active billing cycle toggles (e.g., Monthly vs. Yearly view switches).

### Child Controls (`pricing-column`)

The child block manages granular, item-specific design variants.

- **Settings Group 1 (Layout Accents):** Highlighting specific rows (e.g., "Featured / Most Popular" plan toggles).
- **Settings Group 2 (Cosmetic Accents):** Badge text inputs, explicit custom color markers for headers or buttons.

---

## 2. Component Guidelines & Implementation Standards

### 1. Panel Organization

All sidebar settings must sit contextually within independent `<PanelBody>` containers inside `<InspectorControls>`. Never throw controls loosely into the sidebar without an explicit panel group wrapper.

### 2. Form Control Selections

Do not build custom inputs from raw HTML or generic React elements. Use exclusively native `@wordpress/components`:

- For On/Off state switches (e.g., Highlight Column): Use `<ToggleControl />`.
- For fixed structural choices (e.g., Layout Schemes): Use `<SelectControl />` or `<__experimentalToggleGroupControl />`.
- For numerical increments (e.g., Border Radii or Card Padding): Use `<RangeControl />`.
- For contextual label text strings (e.g., Ribbons or Badges): Use `<TextControl />`.

### 3. State & Attribute Upstream Binding

Every control must cleanly use its respective property value and pass updates back to the database instantly via the functional component `setAttributes` pattern.

---

## 3. Operational Guardrails (Never Violate)

1. **Strict Content/Control Boundaries:** Keep content inputs out of the sidebar. Inline structural text blocks (such as the Plan Title, Pricing Amount, and Bullet points) MUST remain handled inline within the editor viewport via `<RichText />`. The Sidebar Inspector is reserved _exclusively_ for structural, layout, aesthetic, and functional switches.
2. **Translation Native Frameworks:** All user-facing strings, labels, placeholder hints, and headers within controls MUST be wrapped cleanly inside native translation frameworks (`__( 'String Text', 'clh-pricing' )`) to maintain robust internationalization (i18n) workflows.
3. **Prevent Asset Bloat:** NEVER bundle external style components or standalone slider/picker packages. If an alignment or styling task requires execution, search for and configure a core WordPress equivalent framework.
