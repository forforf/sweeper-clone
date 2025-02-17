# Minesweeper Clone
I got annoyed with the UI of my minesweeper app, so I'm seeing if I can make a clone that works for me.
Also, it's an opportunity to try out `@tanstack`'s SSR

## Project Structure
Everything is vanilla @tanstack except for:
* app/pages
* app/components


### What are `pages`
A `route` maps an `endpoint` to some `logic`. The `logic` is held in `pages`.
A `page` will contain the entirety of the user experience for that particular context.
The `page` will provide the structure, while any logic and interaction will come from specific `components`

### What are `components`
The standard meaning, the client side markup and logic. The markup should be specific only to the component.

### Why
In my opinionated experience. I want the server/routes separate from the `pages` and from `components`.
That way the routing layer is independent from the UX. `pages` provide a high level structure, 
for example page logic could be:
dividing content into a 3 column page or a hero with gutter, placement of any internal navigation, etc.
The page is highly dependent upon the context with which it is routed or rendered. Components, on the other hand,
strive to be context independent, and ideally can be easily shared between different pages as needed.


