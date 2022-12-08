# phase-1-project-space-exploration

README:


ARECIBO OBSERVATORY 2.0


* App Purpose: Learn about space and highly-specialized astrophotography by browsing our site and searching through NASA's image database!


App allows users to learn about space through the following methods:

	1. Click on planet icons in the navBar under the header-title (pulls from db.json, wikipedia)

	2. Scroll down to the mainImage display on page-load view the Astronomy Pic Of the Day (APOD) which is auto-generated every day thanks to NASA's APOD API

	3. Search in the search bar in the left column to find images of different space phenomena, NASA equipment, and detailed graphs.
        
     A title and description respective to the first image-result will populate in the left below the search.
        
        * If nothing appears, an error message will appear with suggestions, along with a relevant GIF of Jandro's favorite space-explorer.

     Once the user has successfully submitted a search result, FIVE images will appear below the mainImage, with the first image result from the search filling out the mainImage container.


Functionality:

- Users can view information about the APOD on page-load via API pulling from NASA's APOD.
    api: (`https://api.nasa.gov/planetary/apod?api_key=XjBC4L80dCM7UOyBSupD3sYfCDTWcuAN5LIeb1dv`)

- Users can submit a search query (via 'submit' clickEvent) into NASA's image database API and expect instant results
    api: (`https://images-api.nasa.gov/search?q=${value}&media_type=image`)
    - Users can easily change which of the 5 produced images appears by hovering (via 'mouseover' clickEvent) over the desired image.
    - The user can double click (via 'dblclick' clickEvent) the mainImage to open a new window with a full-resolution view of the desired image.

- Users can click (via 'click' clickEvent) on the planet icons to discover information about each of Sol's planets (and everyone's favorite dwarf-planet).
    api: (`db.json`) - array `planets`
    - This information will appear in the same mainImage container as the rest of the data, and is pulling from a db.json file we created using cited wikipedia information.

- Users can learn the brief history of the Arecibo Obervatory, which housed the largest Space Telescope in the world from 1963 until 2016, located in Arecibo, Puerto Rico.
    api: (`db.json`) - array `observatories`
    * The observatory's telescope was decommissioned in 2020, so this application is meant to be a spiritual successor where users can observe space from the comfort of their homes.


Further information:

~ The images and data on the site were either pulled from NASA's APIs, or from Wikipedia then placed in the db.json.

~ The planet icons were customized for the site by Olivia Perez, and the favicon.ico was customized by Alexander Spagnoli.

~ `./assets/...` folder houses all files that are non-API sourced as to ensure continuity of functionality post-deprecation.

~ The JavaScript, HTML, and CSS was built out by Olivia Perez and Alexander Spagnoli, with the support of:

    General support:
    link: (`https://www.w3schools.com/`) - general JS, HTML, CSS
    link: (`https://developer.mozilla.org/`) - general JS, HTML, CSS
    link: (`https://convertio.co`) - image conversions
    link: (`https://ezgif.com`) - gif editing
    link: (`https://tenor.com`) - gif sourcing

    Fonts:
     - Moon2.0
        link: (`https://HARVATT.HOUSE/STORE`), (`https://www.fontspace.com/`) personal/student use
     - Rocket Wildness
        link: (`https://www.fontspace.com/rocket-wildness-font-f41411`) personal/student use

    CSS fade-in for header-title:
     - link: (`https://stackoverflow.com/questions/11679567/using-css-for-a-fade-in-effect-on-page-load`)
        user: (`https://stackoverflow.com/users/63550/peter-mortensen`)
    
    Force page-scroll to top on refresh:
     - link: (`https://stackoverflow.com/questions/3664381/force-page-scroll-position-to-top-at-page-refresh-in-html`)
        user: (`https://stackoverflow.com/users/1618202/profnandaa`)
    
Other notes/credits:
    * APIs owned by NASA: (`https://api.nasa.gov/`)
    * `db.json` information sourced directly from Wikipedia: (`https://www.wikipedia.org`)
    * `favicon.ico` image sourced originally from NAIC website (`https://www.naic.edu/ao/landing`)
    * `Guardians of the Galaxy` gif-clip owned by Marvel + Disney: (`https://www.marvel.com/movies/guardians-of-the-galaxy`)