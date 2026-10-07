# JSM Bags — Premium React Storefront Demo

This is a React + Vite demo for JSM Bags built as a hybrid **portfolio + catalogue + WhatsApp enquiry + local demo admin** experience.

## What is included

- Premium responsive public website
- High-impact animated hero and scroll-reveal sections
- Catalogue search and category filters
- Product detail pages
- Add-to-quote bag (localStorage)
- WhatsApp quote flow with pre-filled messages
- Portfolio / case-study style work section
- Gallery section
- Custom-printing workflow page
- Contact enquiry form
- Demo admin login and dashboard
- Add/edit/delete products
- Add/edit/delete portfolio work
- Gallery upload/delete using browser storage
- Enquiry pipeline: New → Contacted → Quoted → Converted → Closed
- Business settings
- No database required

## Admin

`/admin`

Demo password: `jsm-demo`

All demo admin state is stored in the browser's `localStorage` so the public site reacts immediately to changes.

## Run

```bash
npm install
npm run dev
```

## Notes for production

1. Replace localStorage with an API + PostgreSQL.
2. Move uploaded images to Cloudinary/S3/Supabase Storage.
3. Add real auth/session handling.
4. Store enquiries server-side and add notifications.
5. Connect WhatsApp Cloud API when automated conversations are needed.
6. Replace demo Pexels URLs with approved client/product photography.

## Visual references

The visual system takes broad inspiration from modern SaaS conversion patterns: clear value propositions, strong CTAs, proof-led sections, animated interactions, structured cards and responsive layouts. It is not a clone of another site.

Public demo imagery uses free-to-use Pexels photo pages discovered during design research. Relevant sources include::
- https://www.pexels.com/photo/plain-tote-bag-9869067/
- https://www.pexels.com/photo/a-person-holding-a-tote-bag-6787035/
- https://www.pexels.com/photo/white-and-blue-tote-bag-with-logo-on-chair-8954490/
- https://www.pexels.com/photo/bag-on-white-background-19197736/
- https://www.pexels.com/photo/person-holding-white-tote-bag-4068314/
- https://www.pexels.com/photo/two-paper-tote-bags-1666067/
- https://www.pexels.com/photo/white-paper-bags-with-wooden-clips-12024977/
