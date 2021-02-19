import React, {Fragment, useState, useCallback, useMemo, useEffect, useRef, useReducer} from "react";

// import * as creators from "./actionCreators";
// import {CreatorsToActions} from "./creatorsToActions"

// useState, useCallback
export const Component1: React.FC = () => {
  // Tuple型
  const [count, setCount] = useState(0);
  // Nullableにするには
  // const [count, setCount] = useState<number | null>(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count])
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}

// useMemo
export const Component2: React.FC = () => {
  const [count, setCount] = useState<number | null>(0);
  const double = useMemo<number | null>(() => {
    if(count === null) return null
    return count * 2;
  }, [count])
  const doubleWithUnit = useMemo<string | null>(() => {
    if(double === null) return null
    return `${double} pt`;
  }, [double])
  const handleClick = useCallback(() => {
    setCount((prev) => {
      if(prev === null) return 0;
      return prev + 1;
    })
  }, [])
  return (
    <div>
      <p>count: ${count}</p>
      <p>double: ${double}</p>
      <p>doubleWithUnit: ${doubleWithUnit}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}

// useCallback
type Props = {
  clientX: number
  clientY: number
  // HTMLElementにする事で、制約をゆるくしている
  handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Component3: React.FC<Props> = props => (
  <div>
    <div
      style={{width: 100, height: 100, background: "#cff"}}
      onClick={props.handleClick}
    />
    <p
      style={{width: 100, height: 100, background: "#fcc"}}
      onClick={props.handleClick}
    />
    <p>X: {props.clientX}</p>
    <p>Y: {props.clientY}</p>
  </div>
)

export const Container: React.FC = () => {
  const [state, update] = useState({
    clientX: 0,
    clientY: 0
  })
  const handleClick = useCallback((
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.persist();
    const {top, left} = e.currentTarget.getBoundingClientRect()
    update(prev => ({
      ...prev,
      clientX: e.clientX - left,
      clientY: e.clientY - top,
    }))
  }, [])
  return (
    <Component3
      clientX={state.clientX}
      clientY={state.clientY}
      handleClick={handleClick}
    />
  )
}

// useEffect
export const Component4: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <div>{count}</div>
  )
}

// useRef
// useRefを用いるとFunction ComponentでもDOMにアクセス出来ます
export const Component5: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if(ref.current === null) return
    const size = ref.current.getBoundingClientRect();
    console.log(size)
  })
  return (
    <div ref={ref} style={{width: 100, height: 100}} />
  )
}

// useReducer
// useReducerはFluxデータフローをReact単体で行えるAPIです
type State = {
  count: number
  unit: string
}
const initialState: State = {
  count: 0,
  unit: "pt"
}
const reducer = (state: State, action: any): State => {
  // typescriptの絞り込み型安全が適応される
  switch(action.type) {
    case "increment":
      return {...state, count: state.count + 1}
    case "decrement":
      return {...state, count: state.count - 1}
    default:
      return state
  }
}
// type Actions = CreatorsToActions<typeof creators>
// const initialState(injects?: Partial<State>): State => ({
//   count: 0,
//   unit: "pt",
//   ...injects
// })

export const Component6: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Fragment>
      Count: {state.count}
      <button onClick={() => dispatch({type: "increment"})}>+1</button>
      <button onClick={() => dispatch({type: "decrement"})}>-1</button>
    </Fragment>
  )
}