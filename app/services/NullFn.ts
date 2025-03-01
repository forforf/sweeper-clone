export type NullFn = <T>(arg: T) => void
export const nullFn: NullFn = (_) => {}

export const nullEventFn = (_: React.TouchEvent) => {}
// const handleTouchStart = (event: React.TouchEvent) => {
//   const target = event.target as HTMLElement; // Type assertion
//   if (target instanceof HTMLButtonElement) {
//     // Access button-specific properties or methods
//     console.log('Button touched', target.textContent);
//   } else if (target instanceof HTMLImageElement) {
//     // Access image-specific properties or methods
//     console.log('Image touched', target.src)
//   } else {
//     console.log('Other element touched', target);
//   }
// };

