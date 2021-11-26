import { HIDE_CONFIRM, SHOW_CONFIRM } from "../services/actions/interaction";
import { useDispatch } from "react-redux";

let resolveCallback;

const useConfirm = () => {
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
    });
    resolveCallback(true);
  };

  const onCancel = () => {
    dispatch({
      type: HIDE_CONFIRM,
    });
    resolveCallback(false);
  };

  const confirm = (text) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: text,
    });
    
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  return { confirm, onConfirm, onCancel };
};

export default useConfirm;
