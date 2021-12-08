import { HIDE_CONFIRM, SHOW_CONFIRM } from "../services/actions/interaction";
import { useDispatch } from "react-redux";

let resolveCallback: (value: boolean) => void;

const useConfirm = () => {
  const dispatch = useDispatch();

  const onConfirm = (): void => {
    dispatch({
      type: HIDE_CONFIRM,
    });
    resolveCallback(true);
  };

  const onCancel = (): void => {
    dispatch({
      type: HIDE_CONFIRM,
    });
    resolveCallback(false);
  };

  const confirm = (text: string): Promise<boolean> => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: text,
    });

    return new Promise<boolean>((res, rej) => {
      resolveCallback = res;
    });
  };

  return { confirm, onConfirm, onCancel };
};

export default useConfirm;

