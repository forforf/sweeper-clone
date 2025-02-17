interface CounterProps {
  handleClick: () => void
  currentCount: number
}

export default function Counter({handleClick, currentCount}: CounterProps) {
  return (
    <button type="button" onClick={handleClick}>
      Add 1 to {currentCount}?
    </button>
  )
}