import { type SchemaTypeDefinition } from 'sanity'
import chefs from './chefs'
import foods from './foods'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [chefs,foods],
}
