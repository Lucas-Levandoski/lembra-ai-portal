
// copied from codepen
// https://codepen.io/thedrhe/pen/jOoWVbK

import './index.css';

type props = {
  width?: number,
  height?: number,
}

export function CirclesAroundRingLoading({ height = 150, width = 150 }: props) {
  return (
    <div className="laoding-container">
      <div className="container" style={{ width, height }}>
        <div className="ring"></div>
        <div className="ball-context-layer ball-context-layer--1">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--2">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--3">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--4">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--5">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--6">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--7">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--8">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--9">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
        <div className="ball-context-layer ball-context-layer--10">
          <div className="ball-container">
            <div className="ball"></div>
          </div>
        </div>
      </div>
    </div>
  );
}