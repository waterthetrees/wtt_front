import React from 'react';
import './FAQpage.scss';
import { Footer } from '@/components/Footer/Footer';

// the {} and ` are used in some blocks of HTML as a way to get around the linter/prettier
// trying to correct (incorrectly) the grammar in those lines

const FAQPage = () => {
  return (
    <div className="faq">
      <div className="faq__image">
        <h1 className="faq__title">Frequently Asked Questions</h1>
        <div className="faq__image-text">
          If you have more questions, feel free to reach out to us!
        </div>
        <button className="faq__button">Join our Slack</button>
      </div>
      <div className="faq__body">
        <div className="faq__question">How do I become a member?</div>
        <div className="faq__answer">
          One the top right there is a sign up where you input your email or
          your google account to create an account to begin taking care of
          trees!
        </div>
        <div className="faq__question">
          How old do I have to be to have an account?
        </div>
        <div className="faq__answer">
          Anyone 13-years-old and above can have an account. For anyone younger,
          they will need parental supervision due to the information provided is
          public
        </div>
        <div className="faq__question">
          Is there a Water the Trees app I can download?
        </div>
        <div className="faq__answer">
          Water the Trees is a web application that can be accessed from any
          browser mobile or desktop. We currently don&apos;t have plans to
          release a mobile app at this time.
        </div>
        <div className="faq__question">How many trees can I adopt?</div>
        <div className="faq__answer">
          You can adopt as many trees as you want. We recommend that the trees
          you adopt are local and is walking distance from your home as that is
          the easiest way to take care of trees.
        </div>
        <div className="faq__question">
          I want to plant a new tree, can I do that here?
        </div>
        <div className="faq__answer">
          Yes! You can plant as may new trees as you please. Our goal is to have
          as many new trees documented worldwide
        </div>
        <div className="faq__question">
          I want to delete my account, where do I go? test text
        </div>
        <div className="faq__answer">
          To delete your account please email us at info@waterthetrees.com
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
