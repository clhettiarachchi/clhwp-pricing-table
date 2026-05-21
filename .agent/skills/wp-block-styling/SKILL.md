---
name: wp-block-styling
description: Use this skill when writing, refactoring, or optimizing SCSS, CSS, layouts, or responsive styling rules for the pricing table and pricing column blocks.
context: stack
---

# Objective

Govern the frontend presentation layer of the block suite. This skill ensures the agent writes highly optimized, modular SCSS adhering strictly to the BEM (Block, Element, Modifier) convention. It enforces fluid, fluid-responsive structural layouts using CSS Grid and Flexbox while completely avoiding global style leakages.

---

## 1. Naming Architecture & BEM System

To prevent conflicts within highly dynamic or shared theme environments, styles must follow a strict corporate CSS prefixing convention using your specific BEM syntax rules.

### CSS Naming Rules

- **Prefix:** Every top-level structural block selector must be prefixed with `clh-`.
- **Elements (`__`):** Inner components or child DOM nodes are appended using two underscores (e.g., `.clh-pricing-column__title`).
- **Modifiers (`--`):** State flags or design variants are appended using two dashes (e.g., `.clh-pricing-column--featured`).

### Namespace Mapping Structure

```scss
// Correct Nesting Paradigm
.clh-pricing-column {
  display: flex;
  flex-direction: column;

  // Element Namespace
  &__title {
    font-size: 1.5rem;
  }

  &__price-box {
    margin: 1.5rem 0;
  }

  // Modifier Namespace
  &--featured {
    border: 2px solid var(--wp--preset--color--primary, #0055ff);

    // Element adaptation inside a modifier scope
    .clh-pricing-column__title {
      color: var(--wp--preset--color--primary, #0055ff);
    }
  }
}
```
