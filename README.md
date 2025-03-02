# Minesweeper Clone
I got annoyed with the UI of my minesweeper app, so I'm seeing if I can make a clone that works for me.
Also, it's an opportunity to try out `@tanstack`'s SSR

## Project Structure
Everything is vanilla @tanstack except for:
* app/game
* app/pages
* app/components

### app/game
This folder contains all logic and components related to the game.

### What are `pages`
A `route` maps an `endpoint` to some `logic`. The `logic` is held in `pages`.
A `page` will contain the entirety of the user experience for that particular context.
The `page` will provide the structure, while any logic and interaction will come from specific `components`

### What are `components`
The standard meaning, the client side markup and logic. The markup should be specific only to the component.

### Why is `game` separate from `pages`/`components`
Originally the code started out as a multi-page SPA app, and the concept was that each
page would be unique, but would be consistent in theme and style. The consistency meant
that there would be reuse. The `page` folder was meant to hold the structure unique to that
page, while reused logic/components would live in a separate folder. The `components` folder
was meant to be the component library for those pages.

### But, why ?
In my opinionated experience. I want the server/routes separate from the `pages` and from `components`.
That way the routing layer is independent from the UX. `pages` provide a high level structure, 
for example page logic could be:
dividing content into a 3 column page or a hero with gutter, placement of any internal navigation, etc.
The page is highly dependent upon the context with which it is routed or rendered. Components, on the other hand,
strive to be context independent, and ideally can be easily shared between different pages as needed.
However, the initial focus is the game and multiple pages will come later. When/If the
game needs a landing page that's separate from the game play page, then that landing page would live
in `pages` most likely.


