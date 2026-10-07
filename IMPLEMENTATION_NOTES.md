# Upgrade notes

## Direction
The public website was rebuilt as a premium business storefront rather than a generic bag catalogue. The design now combines:

- SaaS-inspired information hierarchy
- editorial typography and strong whitespace
- layered image compositions
- motion-based reveal and hover effects
- a conversion-focused quote bag
- trust/proof sections using the client's portfolio work
- a richer custom-print workflow
- a proper admin information architecture

## Image strategy
The earlier uploaded Instagram/profile imagery is kept only for the **portfolio/proof** areas so the work remains recognizable.

Product/hero photography now uses cleaner, generic bag/product imagery from Pexels instead of the low-quality social screenshots used in the previous version.

## No-database behavior
The app uses localStorage for:
- products
- portfolio work
- gallery images
- enquiries
- business settings
- quote bag
- admin session

This is intentional for a demo. The UI and state shape are separated enough that a backend/API layer can be introduced later.
