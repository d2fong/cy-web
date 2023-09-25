import { IdType } from '../IdType'
import { GraphObjectType } from '../NetworkModel'

export interface IndexedColumns {
  [GraphObjectType.NODE]: string[]
  [GraphObjectType.EDGE]: string[]
}

export interface Indices<T> {
  [GraphObjectType.NODE]: T
  [GraphObjectType.EDGE]: T
}

/**
 *
 * Search is a generic interface for the indexers.
 *
 * T is the type of the index generated by the search library.
 * e.g. Fuse.js, Lunr.Index, etc.
 *
 */
export interface Search<T> {
  // Raw query string from the user
  query: string

  // Index generated by the search library
  index: Record<IdType, Indices<T>>

  // Column names to be indexed. By default, all string columns are indexed.
  indexedColumns: Record<IdType, IndexedColumns>

  // Basic options for the search library
  options: SearchOptions

  // Function to convert library-specific results to a list of object IDs to be selected
  convertResults: (result: any) => IdType[]
}

export type Operator = 'AND' | 'OR'

/**
 * Basic search options for simple search
 *
 * TODO: is this good enough?
 */
export interface SearchOptions {
  exact: boolean
  operator: Operator
}
