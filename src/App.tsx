import React, { lazy, Suspense, useState } from "react";

import smallImg from "./assets/imgs/5kb.png";
import bigImg from "./assets/imgs/22kb.png";

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    ),
);
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    ),
);

import "./app.css";
import "./app.less";

function App() {
  const [count, setCounts] = useState("");
  const [show, setShow] = useState(false);
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };

  const onClick = () => {
    setShow(true);
  };
  return (
    <>
      <h2>webpack5-react-ts</h2>
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className="smallImg"></div>
      <div className="bigImg"></div>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />

      <button onClick={onClick}>展示</button>
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
