import { Component } from 'react';
import { Section } from './section/Section';
import { FeedbackOptions } from './feedbackoptions/FeedbackOptions';
import { Statistics } from './statistics/Statistics';
import { Notification } from './notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleCountFeedback = event => {
    const { name } = event.target;
    this.setState(prevState => {
      return { [name]: prevState[name] + 1 };
    });
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    const totalSum = values.reduce((total, value) => {
      return total + value;
    });
    return totalSum;
  };

  countPositiveFeedbackPercentage = () => {
    if (this.state.good >= 1) {
      const roundSum = Math.ceil(
        (this.state.good / this.countTotalFeedback()) * 100
      );
      const feedbackPercentage = `${roundSum + '%'}`;
      return feedbackPercentage;
    }
  };
 
  render() {
    const options = Object.keys(this.state);
    const totalSum = this.countTotalFeedback();
    const { good, neutral, bad } = this.state;
    return (
      <>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleCountFeedback}
          />
        </Section>
        <Section title={'Statistics'}>
          {totalSum === 0 ? (
            <Notification message={'There is no feedback'} />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </>
    );
  }
}