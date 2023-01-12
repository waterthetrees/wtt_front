import React from 'react';
import './FAQpage.scss';
import { Footer } from '@/components/Footer/Footer';

const FAQPage = () => {
  return (
    <div className="faq">
      <div>
        <div className="faq__question">
          How do I become a member?
        </div>
        <div className="faq__answer">
          One the top right there is a sign up where you input your email or
          use your google account to create an account to begin taking care 
          of trees!
        </div>
        <div className="faq__question">
          How old do I have to be to have an account?
        </div>
        <div className="faq__answer">
          Anyone 13-years-old and above can have an account. For anyone younger,
          they will need parental supervision due to the information provided
          is public
        </div>
        <div className="faq__question">
          Is there a Water the Trees app I can download?
        </div>
        <div className="faq__answer">
          Water the Trees is a web application that can be accessed from any
          browser mobile or desktop. We currently don't have plans to release
          a mobile app at this time.
        </div>
        <div className="faq__question">
          How many trees can I adopt?
        </div>
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
          I want to delete my account, where do I go?
        </div>
        <div className="faq__answer">
          To delete your account please email us at info@waterthetrees.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
