import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

function Search() {
  const [counter, setCounter] = useState(0);
  const inputEl = useRef(null);
  function RequestData() { // 获取后端数据
      const currentRequest = inputEl.current.value;
      const data = {'data': currentRequest};
      axios.post('/search', data).then((res) => {
        if (currentRequest === inputEl.current.value)
          console.log(res); // 显示搜索数据
      });
  }

  function useDebounce(fn, delay) { // 防抖
    const { current } = useRef({ fn, timer: null }); // 使用ref对象，以免重渲染时timer清空
    useEffect(() => {
      current.fn = fn;
    });

    return useCallback(() => { // 回调函数
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call();
      }, delay);
    }, [current, delay]);
  }

  const handleKeyUp = useDebounce(() => {
    setCounter(x => x + 1);
    RequestData();
  }, 500);

  return (<div>
    <input onKeyUp={handleKeyUp} ref={inputEl} />
    <div> {counter} </div>

  </div>);
}
export default Search;