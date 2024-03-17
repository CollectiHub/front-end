## Enum Names Standard

1. Use a singular name for most Enum types, but use a plural name for Enum types that are bit fields. Use singular name for Enum fields.
2. Enum keys and values should be the same.
    * When integrating with other systems create an enum in accordance to the other system usually defined in the API specification. This enum should however be converted to follow the rules before leaving the network layer.
    * This rule does not apply to Flag Enums.
3. Enum keys should be in UpperCamelCase(also known as PascalCase), without quotes.
    * Abreviations should also follow this. Do `Io` and `Html` not `IO` or `HTML`
4. Prefer enums over constrained strings. (ie. `'apple' | 'pear'`)
5. 'const' enums preferable when it possible
5. Enum values should not be computed
6. In numeric enums, every member should be explicitly assigned a value instead of relying on auto-incrementation.

### Example

```typescript
export const enum CoolThing {
  Fridge = 0, // BAD: Use 'Tv' as value instead (rule 2)
  Fridge = 'Fridge' // GOOD

  GO = 'GO', // BAD: Key and value should be 'Io' (rule 3)
  Go = 'Go', // GOOD

  'Ice' = 'Ice', // BAD: Key should not have quotes (rule 3)
  Ice = 'Ice', // GOOD,

  IceBergs = 'IceBergs', // BAD: should be in singular. (rule 1)
  IceBerg = 'IceBerg', // GOOD

  Beer = 2 * 2, // BAD: enum value is computed (rule 5)
  Beer = 4 // BETTER but not GOOD
}

// BAD: convert to enum (rule 4)
export type Fruit = 'apple' | 'pear' | 'orange';

// GOOD
export const enum Fruit {
  Apple = 'Apple',
  Pear = 'Pear',
  Orange = 'Orange',
}


// Pluralization of Flag Enums are GOOD.
const enum Traits {
    None = 0,
    Friendly = 1 << 0, // 0001 -- the bitshift is unnecessary, but done for consistency
    Mean = 1 << 1,     // 0010
    Funny = 1 << 2,    // 0100
    Boring = 1 << 3,   // 1000
    All = ~(~0 << 4)   // 1111
}
```
