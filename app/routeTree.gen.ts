/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as GridImport } from './routes/grid'
import { Route as GameImport } from './routes/game'
import { Route as CountImport } from './routes/count'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const GridRoute = GridImport.update({
  id: '/grid',
  path: '/grid',
  getParentRoute: () => rootRoute,
} as any)

const GameRoute = GameImport.update({
  id: '/game',
  path: '/game',
  getParentRoute: () => rootRoute,
} as any)

const CountRoute = CountImport.update({
  id: '/count',
  path: '/count',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/count': {
      id: '/count'
      path: '/count'
      fullPath: '/count'
      preLoaderRoute: typeof CountImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameImport
      parentRoute: typeof rootRoute
    }
    '/grid': {
      id: '/grid'
      path: '/grid'
      fullPath: '/grid'
      preLoaderRoute: typeof GridImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/count': typeof CountRoute
  '/game': typeof GameRoute
  '/grid': typeof GridRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/count': typeof CountRoute
  '/game': typeof GameRoute
  '/grid': typeof GridRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/count': typeof CountRoute
  '/game': typeof GameRoute
  '/grid': typeof GridRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/count' | '/game' | '/grid'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/count' | '/game' | '/grid'
  id: '__root__' | '/' | '/count' | '/game' | '/grid'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CountRoute: typeof CountRoute
  GameRoute: typeof GameRoute
  GridRoute: typeof GridRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CountRoute: CountRoute,
  GameRoute: GameRoute,
  GridRoute: GridRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/count",
        "/game",
        "/grid"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/count": {
      "filePath": "count.tsx"
    },
    "/game": {
      "filePath": "game.tsx"
    },
    "/grid": {
      "filePath": "grid.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
