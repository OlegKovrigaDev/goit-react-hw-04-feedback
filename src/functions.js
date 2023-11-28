export const countTotalFeedback = state => {
  const { good, neutral, bad } = state;
  return good + neutral + bad;
};

export const countPositiveFeedbackPercentage = state => {
  const total = countTotalFeedback(state);
  const { good } = state;
  return total > 0 ? Math.round((good / total) * 100) : 0;
};

export const handleLeaveFeedback = (option, setState) => {
  setState(prevState => ({ [option]: prevState[option] + 1 }));
};
