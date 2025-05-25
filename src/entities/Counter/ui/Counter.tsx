import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { counterActions } from '../model/slice/CounterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CounterProps {
    className?: string,
}

export const Counter = () => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const counterValue = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={increment}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                onClick={decrement}
                data-testid="decrement-btn"
            >
                {t('decrement')}
            </Button>
        </div>
    );
};

export default Counter;
