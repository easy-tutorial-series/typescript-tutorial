# TypeScript 101

- 类型的定义及其基本操作
- 一个例子阐明如何应用以上内容



## 类型的定义及其基本操作

**Q1**: 如何定义类型变量？

| Feature                   | `interface` | `type` |
| ------------------------- | ----------- | ------ |
| 同名合并                  | Y | N |
| extends / implements      | Y | N |
| intersection / union 类型 | N | Y |
| tuple / literal / function 类型 | N | Y |

```typescript
/* interface merge */
interface AInterface {
    prop1: string
}

interface AInterface {
    prop2: string
    method(): string
}

interface BInterface {
    prop3: number
}

/* extends multi interfaces */
interface CInterface extends AInterface, BInterface {}

/* implements multi interfaces */
class SomeClass implements AInterface, BInterface {
    constructor(public prop1: string, public prop2: string, public prop3: number) {}
    method(): string {
        throw new Error("Method not implemented.")
    }
}
```

```typescript
const TypeToSearch = ({
	searchFunction: Promise<{id:number, name:string}>
}) => {
  return (
  <div>
	</div>
  )
}
```



## 推荐阅读

https://basarat.gitbook.io/typescript/

https://github.com/Microsoft/TypeScript/wiki/FAQ#faqs

https://www.typescriptlang.org/docs/handbook/advanced-types.html

