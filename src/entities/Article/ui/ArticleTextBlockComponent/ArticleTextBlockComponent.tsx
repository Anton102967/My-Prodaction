import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import Text from 'shared/ui/Text/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string,
    block: ArticleTextBlock,
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => (
    <div className={classNames('', {}, [className])}>
        {
            block.title && (
                <Text title={block.title} className={cls.title} />
            )
        }
        {
            block.paragraphs.map((paragraph: string, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={index} text={paragraph} className={cls.paragraph} />
            ))
        }
    </div>
));

export default ArticleTextBlockComponent;
