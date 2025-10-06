import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/CounterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { increment, decrement, add } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleInc} data-testid="increment-btn">
                {t('increment')}
            </Button>
            <Button onClick={handleAddFive} data-testid="add5-btn">
                {t('add5')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDec}>
                {t('decrement')}
            </Button>
        </div>
    );
};
