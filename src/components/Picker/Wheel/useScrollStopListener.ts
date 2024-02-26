import React from 'react'

type Callback = () => void

export const createScrollStopListener = (element: Element | null, callback: Callback, timeout: number) :() => void => {
    let removed = false;
    //debugger
    let timer: ReturnType<typeof setTimeout> | null = null;
  const onScroll = () => {
      if (timer) {
        //console.log('clear timeout')
          clearTimeout(timer);
      }
      // const cb = () => {
      //   console.log('cb in timer')
      //   callback()
      // }
      timer = setTimeout(callback, timeout || 200); // default 200 ms
      //console.log('timer: ',timer)
  };
  if(element) element.addEventListener('scroll', onScroll);
  return () => {
      if (removed) {
          return;
      }
      removed = true;
      if (timer) {
        clearTimeout(timer);
      }
      if(element) element.removeEventListener('scroll', onScroll);
  };
};

export const useScrollStopListener = (element: Element | null, callback: Callback, timeout: number) => {
  const callbackRef = React.useRef<Callback>();
  callbackRef.current = callback;
  //console.log('in useScrollStopListener')
  console.log('ussl: ',element)
  React.useEffect(() => {
    //console.log('in useScrollStopListener effect update')
    //debugger
      const destroyListener = createScrollStopListener(element, () => {
        //console.log('ref: ',callbackRef.current)
          if (callbackRef.current) {
              console.log('cb start')
              callbackRef.current();
          }
      }, timeout);
      return () => {
        //console.log('in useScrollStopListener effect delete')
        destroyListener()
    };
  }, [element, timeout]);
};