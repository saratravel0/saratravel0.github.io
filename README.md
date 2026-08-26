# Sara Travels website

A self-contained static website prepared for GitHub Pages. Everything the published homepage needs is inside this folder.

## Edit the photo gallery with Pages CMS

The **Notes from the road** gallery is connected to the free hosted Pages CMS editor. Gallery entries are stored in `content/gallery.json`, and gallery uploads are kept separately in `assets/images/gallery/` so editing the gallery cannot remove images used elsewhere in the design.

1. Publish this repository to GitHub and enable GitHub Pages using the instructions below.
2. Visit <https://app.pagescms.org> and sign in with the GitHub account that owns the repository.
3. Install the Pages CMS GitHub App and grant it access to this repository.
4. Open the repository in Pages CMS, select **Photo Gallery**, and edit the list.
5. Add, remove or reorder entries, choose an image, and edit its location, caption and accessible description.
6. Save. Pages CMS commits `content/gallery.json` and any uploaded images to GitHub. GitHub Pages then republishes the site automatically, normally within a few minutes.

For client access, invite the client's separate GitHub account as a repository collaborator with **Write** access. The client then signs in at <https://app.pagescms.org> with their own account and opens the same repository. Never share the owner's GitHub password or recovery codes.

Removing a gallery entry stops it appearing on the website. To remove its image file too, delete the unused file separately from **Gallery Photos** in the CMS media area. Images outside `assets/images/gallery/` are part of the website design and should not be changed through the gallery editor.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload **the contents of this folder** so `index.html` is at the repository root.
3. Open the repository's **Settings -> Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. GitHub will provide the public website address after deployment finishes.

The site uses relative asset paths, so it works on both a user site such as `username.github.io` and a project site such as `username.github.io/repository-name/`.

## Preview locally

YouTube embeds require an HTTP referrer and return error 153 when `index.html` is opened directly with a `file://` address. From this folder, run:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

Opening `index.html` directly still shows a polished link to the newest uploads instead of a broken player. The editable gallery also keeps a built-in version of the original photos as a fallback.

## Videos

The **Newest from Sara** player uses Sara's YouTube uploads playlist. Newly published public videos appear there automatically after YouTube adds them to the channel playlist.

The larger **Featured diary** card is editorial and currently uses `assets/images/maldives-video-thumbnail.jpg` with the first Maldives video. To feature another video, update its two YouTube links, thumbnail, title and description in `index.html`.

## Folder structure

```text
sara-travels-site/
|-- .nojekyll
|-- .pages.yml
|-- index.html
|-- README.md
|-- content/
|   `-- gallery.json
`-- assets/
    |-- css/
    |-- fonts/
    |-- images/
    |   `-- gallery/
    `-- js/
```
