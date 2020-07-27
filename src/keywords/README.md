# TypeScript Keywords

```json
dependency:{
	"developer": "this is for developer",
	"typescript-grammer-101": "you should known basic typescript grammer"
}
```

I believe **starting from keywords & symbol** is quite a good way for learning a new language especially when you already have experience on other PLs. **Keyword** is quit an important part of materials we could use to build the whole big struct, once you know all the materials & the way of using them, you know the language.

TypeScript could be a little different from other language, it is designed to be a **superset** of JavaScript. So all the keywords from JavaScript standard would be available in TypeScript, but TypeScript also have some extra keywords.

You could have a glance of the full JavaScript keywords [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords).

So let's look at some typescript-specific keywords:



##### `typeof`

```typescript
const person = { id:1, name:'Jack' }
type Person = typeof person
```

`typeof` in type definition can produce a type from a value (but the value should be a constant)



##### `keyof`

```typescript
type Person = { id:number, name:string }
type PersonProps = keyof Person
```

`keyof` enables the [index type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types) feature, imagine if you wanna get a string-collection of some obj's property names, that's the time keyof should come. 

It often plays with other two operation:

-  `T[K]`  means the **type of property in T named K**, called **indexed access operator**.
- `{[T:number|string]:K}` means **all property in an object should be the K type**, and the property name itself is number or string.

```typescript
type Person = { id:number, name:string }
type PersonProps = keyof Person
type Person = {}
```



##### `in`

When you need to map over the types of properties in an object, then you need `in`.

Let's say we need to make all the attribute in a struct optional:

```typescript
type Person = { id:number, name:string }
type PartialPerson = {
	[P in keyof Person]?:Person[P]
}
```

Or we want a readonly-person type:

```typescript
type Person = { id:number, name:string }
type PartialPerson = {
	readonly [P in keyof Person]:Person[P]
}
```

This feature is called [mapped type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types).



##### `extends `

`extends` keyword is very useful, it is used as `A extends B` which means A is a subtype of B, so anywhere which is applicable for B is also for A. It could be also used for [conditional type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types), such as:

```typescript
A extends B ? A : never
```

Which means if A is a subtype of B, then get A otherwise get never.



##### `infer`





