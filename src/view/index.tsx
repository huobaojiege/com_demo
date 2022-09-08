import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useReducer,
  useRef,
  Reducer,
} from "react";

import { Numberadd } from "@/utils/index";
import { Divider, Select, Button } from "antd";

import { useStore } from "@/store/index";

import testClass from "@/utils/class/test";

import useUpdateEffect from "@/hooks/useUpdateEffect";

import "../style/global.less";

import { POST_TM_FAQ } from "@/api/tmReceptionApi";

const { Option } = Select;

type IndexPageProps = {};

interface reduceType {
  count: number;
}
type DispatchDevicesAction = "increment" | "decrement" | "reset";

function reducer(
  state: any,
  action: { type: DispatchDevicesAction; payload?: any }
): reduceType {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
}

function init(initialCount: any): reduceType {
  return initialCount;
}

const TestButton = React.memo((props: any) => {
  console.log(props.title);
  return (
    <button
      color="primary"
      onClick={props.onClick}
      style={
        props.title === "useCallback点击"
          ? {
              marginLeft: 20,
            }
          : undefined
      }
    >
      {props.title}
    </button>
  );
});
const IndexPage: FC<IndexPageProps> = (props) => {
  let fgg: testClass = new testClass("121");
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const [defaultStrListPosition, setDefaultStrListPosition] = useState<any>([
    { x: 10, y: 10 },
    { x: 20, y: 20 },
    { x: 30, y: 30 },
    { x: 40, y: 40 },
  ]);

  const testRef = useRef<HTMLDivElement[]>([]);
  const [logined, setLogined] = useStore((state: any) => [
    state.logined,
    state.setLogined,
  ]);

  const [state, dispatch] = useReducer(
    reducer,
    {
      count: 20,
    },
    init
  );

  useUpdateEffect(() => {}, [show]);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  function funTest() {
    setLogined("12");
  }
  function classFun() {
    fgg.zzName("++++++++");
  }

  const axiosFun = async () => {
    try {
      let ass = await POST_TM_FAQ({ relId: "1212" });
      debugger;
    } catch (error) {
      debugger;
    }
  };

  // async function axiosFun() {}

  function aaa(dom: HTMLDivElement) {
    testRef.current.push(dom);
  }

  function testBut() {
    let arr = [1, 2, 4, 5, 7, 9, 10];
    let numarr = arr.sort((a, b) => {
      return b - a;
    });
    debugger;
  }
  const innerOptions = [{ label: "122", value: "1212" }];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <TestButton title="普通点击" onClick={() => setCount(count + 1)} />
        <TestButton title="useCallback点击" onClick={add} />
      </div>
      <div style={{ marginTop: 20 }}>count: {count}</div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        切换
      </button>

      <h4 className="ss">useReducer</h4>
      <div>
        <h3>{state.count}</h3>
        <button onClick={() => dispatch({ type: "decrement" })}>333</button>
      </div>

      <h4>方法</h4>
      <div>
        <h4>{logined}</h4>
        <button onClick={funTest}>测试下</button>
      </div>
      <h4>class类的使用</h4>
      <div>
        <button onClick={classFun}>点击</button>
      </div>

      <h4>请求</h4>

      <div>
        <button onClick={axiosFun}>点击</button>
      </div>

      <h4>ref循环</h4>
      <div>
        {defaultStrListPosition.map((item: any, index: number) => {
          return <span ref={aaa}>{index}</span>;
        })}
      </div>

      <h4>Select</h4>
      <Select
        style={{ width: 120 }}
        listHeight={160}
        // options={innerOptions}
        dropdownRender={
          (menu) => {
            return (
              <div>
                <h4>2121221</h4>
                {menu}
              </div>
            );
          }
          // 阻止一些事件冒泡，因为Select源码监听了这些事件，有特殊处理，如backspace
        }
      >
        {innerOptions.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>

      <h4>方法测试</h4>
      <Button type="primary" onClick={testBut}>
        点击测试下
      </Button>
    </div>
  );
};

export default IndexPage;
