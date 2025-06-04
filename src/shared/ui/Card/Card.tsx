import { classNames } from "shared/lib/classNames/classNames";
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from "./Card.module.scss";


interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string,
    children: ReactNode,
}

export const Card = memo(({ className, children,  ...OtherProps }: CardProps) => (
    <div className={classNames(cls.Card, {}, [className])}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...OtherProps}
    >
        {children}
    </div>
));

export default Card;
