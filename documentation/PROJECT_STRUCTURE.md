# Documentation for Angular project architecture

It's important to ensure that project architecture consistent, to have a chance scale it easy. The proposed structure gives a good option of reusability and maintainability.


## Structure description
src
|-- app
|   |-- features 
|   |   |-- registration (as example)
|   |   |   |-- services             // Service related to registration feature
|   |   |   |-- components           // Components specific to registration feature
|   |   |   |-- directives           // Directives specific to registration feature
|   |-- components
|   |   |-- app-button (as example)  // A reusable component
|   |   |-- app-button. component.ts
|   |   |-- app-button.styles.scss
|   |   |-- app-button.spec.ts
|   |   |-- app-button.html
|   |-- services                     // Global services
|   |-- pipes                        // Reusable global pipes
|   |-- store                        // Global store, that contains settings of application level
|   |-- constants                    // Global constant values used in the app
|   |-- styles                       // Global styles
|   |-- pages
|   |   |-- private                   // Private pages (e.g., user dashboard)
|   |   |   |-- *. page.ts            // TypeScript file
|   |   |   |-- *routes.ts            // Route configuration
|   |   |-- public
|   |   |   |-- registation          // Public pages (e.g., registration)
|   |   |   |-- 404                  // Public pages (e.g., error pages)
|   |-- utils                        // Global utilities participating in business logic handling
|   |   |-- functions                // Reusable functions
|   |   |-- rxjs-operators           // Reusable RxJS operators
|   |   |-- classes                  // Reusable classes
|   |-- assets
|   |   |-- images                   // Images used in the app
|   |   |-- icons                    // Icons assets
|   |   |-- i18n                     // Localization files
|   |-- environments                 // Configuration for different environments
