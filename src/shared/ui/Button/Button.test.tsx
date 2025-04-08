/* eslint-disable object-curly-spacing */

import {render, screen} from '@testing-library/react';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';

/* eslint-disable object-curly-spacing */

describe('Button', () => {
    test('Test render', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('Test clear theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
