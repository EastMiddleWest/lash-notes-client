import React from 'react'

type Callback = () => void

const createScrollStopListener = (element: Element | null, callback: Callback, timeout: number) :() => void => {
    let removed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
  const onScroll = () => {
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(callback, timeout || 200); // default 200 ms
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
  React.useEffect(() => {
    //console.log('in useScrollStopListener effect update')
      const destroyListener = createScrollStopListener(element, () => {
          if (callbackRef.current) {
              callbackRef.current();
          }
      }, timeout);
      return () => {
        //console.log('in useScrollStopListener effect delete')
        destroyListener()
    };
  }, [element, timeout]);
};