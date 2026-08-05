# Care Theory Clinic v2

This is a static GitHub Pages website.

## Upload

Upload all files and the complete `assets` folder into the root of your GitHub repository.

Files:
- index.html
- prices.html
- privacy.html
- styles.css
- script.js
- assets/care-theory-logo.jpeg
- assets/lilly-profile.jpeg

Commit the changes and wait for GitHub Pages to redeploy.

## Important

The included prices were adapted from the reference price list supplied by the user. Confirm every price before publishing.

The booking buttons currently use email and WhatsApp. Replace these links after creating a proper booking system.


## Version 3 updates
- Floating WhatsApp button added to every page.
- Header and footer logos changed to `object-fit: contain` so the top of the C is no longer cropped.


## Version 4 updates

- Header logo enlarged.
- Added an automatic before-and-after gallery.
- Added the first three before-and-after images in `assets/before-after/`.

### Adding a new before-and-after image

1. Open `assets/before-after/` in GitHub.
2. Select **Add file → Upload files**.
3. Upload the image and commit it.
4. Keep using image filenames such as:
   - `before-after-04.jpeg`
   - `before-after-05.jpeg`
5. The live website reads the folder through the public GitHub API and displays all supported images automatically.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.

The repository and folder names used by the gallery are configured in `index.html`:

- Owner: `Saeidpp`
- Repository: `care-theory-clinic`
- Folder: `assets/before-after`

If the GitHub username or repository name changes, update those values.
