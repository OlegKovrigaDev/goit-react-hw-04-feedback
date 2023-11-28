import React, { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Notification from 'components/Notification/Notification';
import Statistics from 'components/Statistics/Statistics';
import Section from 'components/Section/Section';

export const App = () => {
  const initialFeedback = { good: 0, neutral: 0, bad: 0 };
  const [feedback, setFeedback] = useState(initialFeedback);

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((total, value) => total + value, 0);

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? Math.round((feedback.good / total) * 100) : 0;
  };

  const handleLeaveFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>

      {total > 0 ? (
        <Section title="Statistics">
          <Statistics
            {...feedback}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
