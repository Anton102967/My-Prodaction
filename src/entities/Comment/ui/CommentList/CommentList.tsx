import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import Text from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';


interface CommentListProps {
    className?: string,
    comment?: Comment[],
    isLoading?: boolean,

}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation('article-details');

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>

        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comment?.length
                ? comment.map(comment => (
                    <CommentCard
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
                : <Text text={t('Коментарии отсуствуют')} />
            }
        </div>
    );
});

export default CommentList;
