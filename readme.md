# WireUI

Wire UI is a library of components and resources to empower your Laravel and Livewire application development.

Starting a new project with Livewire can be time-consuming when you have to create all the components from scratch. Wire
UI helps to skip this step and get you straight to the development phase.

---

This package is a modified version of that <a href="https://github.com/wireui/wireui" target="_blank">WireUI</a>
version, but it supports page direction RTL AND LTR to be compatible with some languages, for example Arabic and other
languages.

<p align="center">
    <a href="https://github.com/wireui/wireui" target="_blank">WireUI</a>
    <a href="https://livewire-wireui.com" target="_blank">📚 Documentation</a>
</p>

---
## Requirements

* PHP 8.x
* Composer
* Laravel 8.x | 9.x
* Livewire 2.10+
* Alpine.js 3.x
* Tailwindcss 3.x
* @tailwindcss/aspect-ratio 0.4.x
* @tailwindcss/forms 0.4.x
* @tailwindcss/typography 0.5.x

---
## Installation

1. Run the following command to add WireUI to your project:

```sh
composer require altwaireb/wireui
```

2. Add the WireUI tag above Alpinejs script tag in your page layout:
   ```html
   <html>
    <head>
        ...
        <wireui:scripts />
        <script src="//unpkg.com/alpinejs" defer></script>
    </head>

Alternatively, you can use the equivalent Blade directive:

```html
<html>
<head>
   ...
   @wireUiScripts
   <script src="//unpkg.com/alpinejs" defer></script>
   ...
   
   Sometimes you need to pass extra html attributes to script tag, like the nonce attribute 
   @wireUiScripts(['nonce': 'csp-token'])
   @wireUiScripts(['nonce': 'csp-token', 'foo' => true])
```

3. Add the following settings to your Tailwindcss config file, `tailwind.config.js`:

```js 
const colors = require('tailwindcss/colors');

module.exports = {
    
    presets: [
        require('./vendor/altwaireb/wireui/tailwind.config.js')
    ],

    content: [
            ...
        './vendor/altwaireb/wireui/resources/**/*.blade.php',
        './vendor/altwaireb/wireui/ts/**/*.ts',
        './vendor/altwaireb/wireui/src/View/**/*.php'
    ],

    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
                secondary: colors.gray,
                positive: colors.emerald,
                negative: colors.red,
                warning: colors.amber,
                info: colors.blue
            },
        },
    },

}
```

4. Add the following settings to your app css file, **resources/css/app.css**:

```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer utilities {
       [dir="rtl"] .form-select {
           background-position: left 0.5rem center;
       }
   
       [dir="rtl"] select {
           background-position: left 0.5rem center;
           padding-right: 0.75rem;
       }
   }
   ```
---
## Publishing

WireUI does not need any additional configuration, but you can publish the files and customize them to your preference.

   ```sh
    php artisan vendor:publish --tag='wireui.config'
    php artisan vendor:publish --tag='wireui.resources'
    php artisan vendor:publish --tag='wireui.lang'
   ```


