/* eslint-disable object-curly-spacing */
import {fireEvent, screen} from '@testing-library/react';
import {Sidebar} from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import {componentRender} from 'shared/config/tests/componentRender/componentRender';
/* eslint-disable object-curly-spacing */

describe('Sidebar', () => {
    test('with only first param', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        componentRender(<Sidebar />);
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
