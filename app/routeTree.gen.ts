/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CountImport } from './routes/count'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

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
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/count': typeof CountRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/count': typeof CountRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/count': typeof CountRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/count'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/count'
  id: '__root__' | '/' | '/count'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CountRoute: typeof CountRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CountRoute: CountRoute,
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
        "/count"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/count": {
      "filePath": "count.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
