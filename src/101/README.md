# TypeScript 101

[TOC]

## 什么是类型？

> A program variable can assume a range of values during the execution of a program. An upper bound of such a range is called a **type** of the variable.



## 结构类型

typescript使用结构类型，这意味倘若我们有类型A，B如下：

```typescript
type A = { prop: string }
type B = { prop: string }
```

TypeScript视其为同一类型（与鸭子类型不同的是鸭子类型是运行时的概念）



## 类型的定义及其基本操作

### **Q1**: 如何定义类型变量？

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
type AType = {
    prop1: string
}

type BType = {
    prop2: string
}

/* use intersection type */
type CType = AType & BType

/* use union type */
type DType = AType | BType

/* define function type */
type FuncReceive = (x: CType) => DType

/* define literal type */
type A = 'A'
type B = 1

/* define tuple */
type SomeTuple = [number, string]

/* variance */
/* say we have a type Base; and type Child which is a subtype of Base, then instances of Child can be assign to varible with type Base, this is Polymorphism */
/* and what if we get a composition of A & B, how can we get its Child type? */
/* variance is used to describe the change direction of its subtype (Child -> Base | Base -> Child)
/* variance types */
	/* Covariant : (co aka joint) only in same direction */
	/* Contravariant : (contra aka negative) only in opposite direction */
	/* Bivariant : (bi aka both) both co and contra. */
	/* Invariant : if the types aren't exactly the same then they are incompatible. */

/* in typescript the function is Bivariant if you turn off the strictFunctionTypes */
```

在涉及到函数类型时，variance的概念会帮助我们对类型多态进行分析，那么什么是 [variance](https://www.wikiwand.com/en/Covariance_and_contravariance_(computer_science))？

> **Variance** refers to how sub-typing between more complex types relates to sub-typing between their components.

简言之 variance 是用以描述复杂类型组合的子类型与其本身之间的关系。
 variance types 

- **Covariant** : only in same direction 
- **Contravariant** : only in opposite direction
- **Bivariant** : both co and contra
- **Invariant** : if the types aren't exactly the same then they are incompatible

举例而言，设 `type A = compose(type X, type Y)` 为某复杂类型组合；

若其子类型为 `type B = compose(type X, type Y)`, 则在该过程中称类型X，Y满足 **Invariant**。

若其子类型为 `type B = compose(parent-type X, sub-type Y)`, 则在该过程中称类型X满足 **Contravariant**，Y满足 **Covariant**。

若其子类型为 `type B = compose(parent-type x | sub-type X, type Y)`, 则在该过程中称类型X满足 **Bivariant**。

**aQ：**那么什么的对于一个函数类型而言，什么样的 variance 是类型安全的（基于subtyping的大前提）？

假设现有以下类型及函数：

```typescript
type Animal<T = string> = { species: T }
type Dog = { name: string } & Animal<'Dog'>
type DogA = Dog & { propA: any }
type DogB = Dog & { propB: any }

const f = (g: (d: Dog) => Dog) => {
  throw new Error('not implemented')
}
```

那么f函数可能在其函数体内用以下形式使用g：

```typescript
const f = (g: (d: Dog) => Dog) => {
	const a:DogA = {...}
  const result = g(a)
  result.name
  throw new Error('not implemented')
}
```

f在起函数体中可能传入Dog类型的任一子类型，则g的参数应为更加generic的类型；而f中在使用g函数的执行返回时，可能使用Dog中的任一属性，则g应返回更加specific的类型。

而在TypeScript中，不打开 `tsconfig.json` 中的 `strictFunctionTypes` 选项时，函数的参数类型是 Contravariant 的：

```typescript
const f = (g: (d: Dog) => Dog) => {
  const a: DogA = { name: '', species: 'Dog', propA: '' }
  g(a)
  throw new Error('not implemented')
}

const g1 = (d: Animal): Dog => {
  throw new Error('not implemented')
}

const g2 = (d: DogB): Dog => {
  d.propB
  throw new Error('not implemented')
}

// 以下都合法，而第二个函数调用会引起错误（为什么这样设计请详见TS FAQ）
f(g1)
f(g2)
```



### **Q2**: 如何使用类型参数（泛型）？

```typescript
type MyNode = {
    value: string
    node: MyNode | undefined
}

/* let's make it generic */
type MyNode<T> = {
    value: T
    node: MyNode<T> | undefined
}

/* let's give it a constraint */
type MyNode<T extends number | string> = {
    value: T
    node: MyNode<T> | undefined
}

/* use it in with class */
const stringArray: Array<string> = []

/* use it with function */
const [state, setState] = useState<number | string>(1)

/* further operations
...mapped type
...index type
...conditional type
```



## In practice

假设我们有模型 User，Company，他们都需要一个结构为 `{id:ID, name: NAME}` 的子结构，而运用 intersection type 可以将共同部分抽离：

```typescript
type Identity<ID = number, NAME = string> = {
  id: ID
  name: NAME
}

type User = Identity & {...}
type Company = Identity & {...}
```

我们定义 User 为：

```typescript
type User = Identity & {
  age: number
  comapny: Company
  gender: 'man' | 'woman' | 'other'
  avatar: URL
  desc: string
  phone: number
  email: string
  friends: User[]	//recursive type
}
```

以及一些操作函数：

```typescript
type SameTypeFormat<T> = (v: T) => T

const formatUserDescription: SameTypeFormat<User['desc']> = v => {
  throw new Error('not implemented')
}

const formatUserName: SameTypeFormat<User['name']> = v => {
  throw new Error('not implemented')
}

const findMutualFriendOfMyFriendsAndMe = (me: User) =>
  dropRepeats(me.friends.map(f => intersection(me.friends, f.friends)).reduce(concat))
```



## 推荐阅读

https://github.com/Microsoft/TypeScript/wiki/FAQ#faqs

https://www.typescriptlang.org/docs/handbook/advanced-types.html

https://basarat.gitbook.io/typescript

http://lucacardelli.name/Papers/TypeSystems.pdf