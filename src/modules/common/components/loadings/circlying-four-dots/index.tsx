
// copied from codepen
// https://codepen.io/zerospree/pen/XWaGER

import './index.css';

type props = {
  width?: number,
  height?: number
}

export function CirclingFourDotsLoading({ height=50, width=50 }: props) {
  return (
    <div className="load" style={{height, width}}>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
    </div>
  );
}