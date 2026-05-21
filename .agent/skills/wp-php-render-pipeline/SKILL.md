---
name: wp-php-render-pipeline
description: Use this skill when writing or updating server-side PHP templates, block rendering logic, asset enqueue lists, or plugin bootstrapping files.
context: stack
---

# Objective

Govern the server-side architecture of dynamic WordPress blocks. This skill ensures that your PHP rendering pipeline matches modern core registration specifications, stays contextually secure using late-escaping protocols, and structures plugin loaders cleanly using object-oriented PSR-4 standards.

---

## 1. Dynamic Block Execution Standards

Since our React layers utilize a `"save": "null"` strategy to prevent layout corruption inside the database, the public-facing HTML markup must be parsed completely on the server.

### File Layout Specification

Every block folder must contain a standalone template file mapped directly via its `block.json` config:

- **Mapping (`block.json`):** `"render": "file:./render.php"`
- **Execution Lifecycle:** WordPress automatically passes three variables directly into the scope of your isolated `render.php` file when parsing the post layout:
  - `$attributes` (Array containing all saved block options and strings)
  - `$content` (String containing the inner nested HTML blocks—vital for parent elements)
  - `$block` (Instance of the `WP_Block` orchestration class)

---

## 2. Secure Late-Escaping Protocols (Non-Negotiable)

To maintain strict code security within managed web solution environments, you must assume all incoming block attributes are unsafe. You must clean and format all variables at the exact moment they are injected into your HTML strings.

### The Escaping Matrix

- **Text Outputs:** Wrap all plain strings in `esc_html()`.
- **HTML Layouts & Multiline Lists:** Wrap complex inner components, HTML fields, or `<RichText>` fields inside `wp_kses_post()`.
- **Attribute Formats:** Wrap layout flags, styling variables, class names, or data fields inside `esc_attr()`.
- **Hyperlinks:** Run all anchors and button destinations strictly through `esc_url()`.

---

## 3. Structural Blueprint Frameworks

### The Parent Blueprint (`pricing-table/render.php`)

The parent block's sole job on the server side is to structure the wrapper layout and output its compiled child blocks safely.

- **Rule:** Use a BEM class format derived directly from the block name.
- **Rule:** Inject the nested column HTML layout by outputting the unmodified `$content` variable.

```php
<?php
/**
 * Parent Pricing Table Server-Side Template.
 * Namespace: CLHDevPartners\PricingTableSuite
 */

$wrapper_classes = 'clh-pricing-table-container';
if ( ! empty( $attributes['billingCycle'] ) ) {
    $wrapper_classes .= ' is-billing-' . esc_attr( $attributes['billingCycle'] );
}

$block_props = get_block_wrapper_attributes( array( 'class' => $wrapper_classes ) );
?>
<div <?php echo $block_props; ?>>
    <div class="clh-pricing-table-grid">
        <?php // The $content variable houses the compiled HTML output of all child pricing columns. ?>
        <?php echo $content; ?>
    </div>
</div>
```
