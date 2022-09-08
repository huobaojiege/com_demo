/**
 * 自定义hooks  按钮长按操作
 *
 */

import { useCallback, useRef, useState } from "react";

export default function useLongPress<T = any>(
  onLongPress: (e: React.MouseEvent, arg: any) => void,
  onClick: (e: React.SyntheticEvent, arg: any) => void,
  cb: (e: React.SyntheticEvent, arg: any) => void,
  { shouldPreventDefault = true, delay = 300 } = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef(0);
  const target = useRef<any>();

  const start = useCallback(
    (event, arg) => {
      event.persist();
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = window.setTimeout(() => {
        onLongPress(event, arg);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event, arg, shouldTriggerClick = true) => {
      event.persist();
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick(event, arg);
      longPressTriggered && cb && cb(event, arg);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered, cb]
  );

  return (arg: T) => {
    return {
      onMouseDown: (e: React.MouseEvent) => start(e, arg),
      onTouchStart: (e: React.TouchEvent) => start(e, arg),
      onMouseUp: (e: React.MouseEvent) => clear(e, arg, true),
      onMouseLeave: (e: React.MouseEvent) => clear(e, arg, false),
      onTouchEnd: (e: React.TouchEvent) => clear(e, arg, true),
    };
  };
}

const isTouchEvent = (e: React.TouchEvent) => {
  return "touches" in e;
};

const preventDefault = (e: React.TouchEvent) => {
  if (!isTouchEvent(e)) return;

  if (e.touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
};
