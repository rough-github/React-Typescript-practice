export type Row = {
  id: string
  age: string
  answers: (number | null)[]
}

export type Rows = Row[]

export const rows: Rows = [
  {
    id: "up20-un30",
    age: "20-30歳",
    answers: [0.18, 0.22, 0.42, 0.18]
  },
  {
    id: "up30-un40",
    age: "30-40歳",
    answers: [0.12, 0.38, 0.45, 0.68]
  },
  {
    id: "up30-un40",
    age: "30-40歳",
    answers: [null, null, null, null]
  }
]