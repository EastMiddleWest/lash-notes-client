

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

export const stringifyValue = (value: number): string => {
  if(value < 0) return ''
  else return value < 10 ? '0'+value : String(value)
}

export const getMonthName = (value: number) => {
  const monthes = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
  return value >= 0 ? monthes[value-1] : ''
}