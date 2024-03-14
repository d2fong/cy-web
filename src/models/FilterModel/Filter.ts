import { stringify } from 'uuid'
import { IdType } from '../IdType'
import { GraphObjectType } from '../NetworkModel'
import { DiscreteRange } from '../PropertyModel/DiscreteRange'
import { NumberRange } from '../PropertyModel/NumberRange'
import { AttributeName, Table, ValueType } from '../TableModel'

/**
 * Base filter interface to be implemented by all filters
 */
interface FilterBase {
  target: GraphObjectType
  attribute: AttributeName
}

export interface DiscreteFilter<T> extends FilterBase {
  apply: (range: DiscreteRange<T>, table: Table) => IdType[]
}

export interface NumericFilter extends FilterBase {
  apply: (range: NumberRange, table: Table) => IdType[]
}

export const createDiscreteFilter = <T>(
  target: GraphObjectType,
  attribute: string,
): DiscreteFilter<T> => {
  return {
    target,
    attribute,
    apply: (range: DiscreteRange<T>, table: Table): IdType[] => {
      const rangeSet = new Set<T>(range.values)
      const { rows } = table
      const result: IdType[] = []
      rows.forEach((row: Record<string, ValueType>) => {
        if (rangeSet.has(row[attribute] as T)) {
          result.push(row.id as IdType)
        }
      })
      return result
    },
  }
}

export const createNumericFilter = (
  target: GraphObjectType,
  attribute: string,
): NumericFilter => {
  return {
    target,
    attribute,
    apply: (range: NumberRange, table: Table): IdType[] => {
      const { rows } = table
      const result: IdType[] = []
      rows.forEach((row: Record<string, ValueType>) => {
        const value = row[attribute] as number
        if (value >= range.min && value <= range.max) {
          result.push(row.id as IdType)
        }
      })
      return result
    },
  }
}
