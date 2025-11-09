import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card as CardDeprecated } from '@/shared/ui/deprecatted/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecatted/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { StarRating } from '@/shared/ui/deprecatted/StarRating';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecatted/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecatted/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            title={starsCount ? t('Спасибо за оценку') : title}
                        />
                    }
                    off={
                        <TextDeprecated
                            title={starsCount ? t('Спасибо за оценку') : title}
                        />
                    }
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {' '}
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack max gap="16" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                    <Button
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandle}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <VStack max gap="32">
                                {modalContent}
                                <Button
                                    onClick={acceptHandle}
                                    size="l"
                                    fullWidth
                                >
                                    {t('Отправить')}
                                </Button>
                            </VStack>
                        }
                        off={
                            <VStack max gap="32">
                                {modalContent}
                                <ButtonDeprecated
                                    onClick={acceptHandle}
                                    size={ButtonSize.L}
                                    fullWidth
                                >
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            </VStack>
                        }
                    />
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card max border="round" padding="24">
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    className={className}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
