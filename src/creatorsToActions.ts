// import * as creators from "./actionCreators"

type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never
}

// type T = ReturnTypes<typeof creators>

type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never

export type CreatorsToActions<T> = Unbox<ReturnTypes<T>>