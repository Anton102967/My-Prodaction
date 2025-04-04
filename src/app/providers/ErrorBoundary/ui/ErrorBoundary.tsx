import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from 'widgets/PageError';

interface ErrorBoundaryProps {
        children: ReactNode;
    }
    interface ErrorBoundaryState {
        hasError: boolean;
    }

class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Обновляем состояние, чтобы показать запасной UI при следующем рендере
        return { hasError: true };
    }

    componentDidCatch(error:Error, errorInfo: ErrorInfo) {
        // Вы можете логировать ошибку в сторонний сервис
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // Можно отрендерить любой запасной UI
            return (
                <Suspense fallback="">
                    <PageError />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
